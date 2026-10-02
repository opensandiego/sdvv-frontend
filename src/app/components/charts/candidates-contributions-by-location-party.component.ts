import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  computed,
  ElementRef,
  inject,
  OnDestroy,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, map, of, startWith, switchMap } from 'rxjs';
import { AngularEChartWrapperComponent } from './angular/angular-echart-wrapper.component';
import { ChartTitleComponent } from 'lib-ui-components';
import { CandidatesContributionsByLocationPartyService } from 'src/app/services/candidates-contributions-by-location-party.service';
import { getContributionsByInOutCityParty } from './options-phase-1/contributions-by-location-options';

@Component({
  imports: [CommonModule, AngularEChartWrapperComponent, ChartTitleComponent],
  selector: 'candidates-contributions-by-location-party-comparison-chart',
  template: `
    <div
      class="candidates-contributions-by-location-party-comparison-container"
    >
      <chart-title
        class="candidates-contributions-by-location-comparison-f460ac-chart-title"
        [titleText]="titleContribLoc"
        [tooltipText]="tooltipContribLoc"
      ></chart-title>
      @if (hasData()) {
        @if (processedChartData(); as data) {
          <angular-echarts
            [options]="data.options"
            [height]="data.height"
            [loading]="isLoading()"
            (chartClick)="onChartClick($event)"
          ></angular-echarts>
        }
      } @else {
        <div class="no-data">No Contributions to Candidates Found</div>
      }
      <div
        class="candidates-contributions-by-location-party-comparison-footnote"
      >
        <p><strong>Note:</strong> {{ footnote }}</p>
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }

      .candidates-contributions-by-location-party-comparison-container {
        margin: 20px;
        padding: 15px 25px 15px 25px;
        background: #fff;
        box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.21);

        .no-data {
          margin: 20px;
          text-align: center;
          font-size: 18px;
          font-weight: bold;
          color: #999999;
        }

        .candidates-contributions-by-location-party-comparison-footnote {
          p {
            text-align: center;
            font-size: 14px;
            font-weight: 400;
          }
        }
      }
    `,
  ],
})
export class CandidateContributionsByLocationPartyComparisonChartComponent
  implements AfterViewInit, OnDestroy
{
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private dataService = inject(CandidatesContributionsByLocationPartyService);

  titleContribLoc = 'Contributions to Candidates';
  tooltipContribLoc =
    'Contributions more than $100 per year as reported on Form 460';
  footnote = `Itemized contributions as reported on FPPC Form 460. Contributions are itemized when a contributor's cumulative contributions to a committee total $100 or more within a calendar year. See FAQ for more.`;

  // observer to update component width signal
  // to use in chart options function
  private el = inject(ElementRef);
  private observer!: ResizeObserver;
  private width = signal<number>(0);

  ngAfterViewInit() {
    this.observer = new ResizeObserver((entries) => {
      this.width.set(entries[0].contentRect.width);
    });

    this.observer.observe(this.el.nativeElement);
  }
  ngOnDestroy() {
    this.observer.disconnect();
  }

  onChartClick(params: any) {
    // Filter for yAxis label clicks only
    if (params.componentType === 'yAxis' && params.targetType === 'axisLabel') {
      const dataIndex = params.dataIndex;

      if (this.preProcessedData()?.candidateSeries[dataIndex]) {
        const candidateId =
          this.preProcessedData()?.candidateSeries[dataIndex].candidateId;

        this.router.navigate([candidateId], {
          relativeTo: this.activatedRoute,
        });
      }
    }
  }

  private state$ = this.activatedRoute.paramMap.pipe(
    // get parameters from route
    map((params) => ({
      year: params.get('year') ?? undefined,
      office: params.get('office_name') ?? undefined,
      district: params.get('district_number') ?? undefined,
    })),
    // use parameters from route to get data from service
    switchMap((params) =>
      this.dataService.getContributionsByLocationParty(params).pipe(
        map((data) => ({ loading: false, data, error: null })),

        startWith({ loading: true, data: null, error: null }),

        catchError((error) => of({ loading: false, data: null, error })),
      ),
    ),
  );

  // convert the observable stream to a signal
  private state = toSignal(this.state$, {
    initialValue: { loading: true, data: null, error: null },
  });

  // expose read-only signals for use in template
  public preProcessedData = computed(() => {
    const data = this.state().data;
    if (!data) return null;

    const candidateSeries = data.candidateSeries
      .map((candidate) => {
        const inCity = candidate.f460a.inCity + candidate.f460c.inCity;
        const outCity = candidate.f460a.outCity + candidate.f460c.outCity;
        const politicalParty =
          candidate.f460a.politicalParty + candidate.f460c.politicalParty;

        // generate totalContributions per candidate in component, not in API-db query
        return [
          {
            candidateId: candidate.candidateId,
            candidateName: candidate.candidateName,
            inCity,
            outCity,
            politicalParty,
            totalContributions: inCity + outCity + politicalParty,
          },
        ];
      })
      .flat()
      .sort((a, b) => b.candidateName.localeCompare(a.candidateName));

    return { candidateSeries };
  });
  public isLoading = computed(() => this.state().loading);
  public hasData = computed(() =>
    this.state().data?.candidateSeries ? true : false,
  );

  public processedChartData = computed(() => {
    // this.width() causes the processedChartData function to run when this.width changes.
    // This is needed to redraw the chart when the size of its container changes.
    this.width();

    const data = this.preProcessedData();
    if (!data) return null;

    const { candidateSeries } = data;

    // Generate the chart options object the candidates
    const options = getContributionsByInOutCityParty({
      candidateSeries,
    });

    // Calculate height for the chart based on the amount of candidates/rows of stacks
    const itemHeight = 40;
    const paddingsAndMargins = 80;
    const height = candidateSeries.length * itemHeight * 1 + paddingsAndMargins;

    return { options, height: `${height}px` };
  });
}
