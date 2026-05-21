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
import { CandidatesIndependentExpendituresService } from 'src/app/services/candidates-independent-expenditures/candidates-independent-expenditures.service';
import { getSupportedVsOpposedComparison } from './options-phase-1/independent-expenditures-options';

@Component({
  imports: [CommonModule, AngularEChartWrapperComponent, ChartTitleComponent],
  selector: 'candidates-independent-expenditures-comparison-chart',
  template: `
    <div class="candidates-independent-expenditures-comparison-container">
      <chart-title
        class="candidates-independent-expenditures-comparison-f460d-chart-title"
        [titleText]="titleIndExp"
        [tooltipText]="tooltipIndExp"
      ></chart-title>
      <ng-container *ngIf="processedChartData() as data">
        <angular-echarts
          [options]="data.options"
          [height]="data.height"
          [loading]="isLoading()"
          (chartClick)="onChartClick($event)"
        ></angular-echarts>
      </ng-container>
      <div class="candidates-independent-expenditures-comparison-footnote">
        <p><strong>Note:</strong> {{ footnote }}</p>
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }

      .candidates-independent-expenditures-comparison-container {
        margin: 20px;
        padding: 15px 25px 15px 25px;
        background: #fff;
        box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.21);

        .candidates-independent-expenditures-comparison-footnote {
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
export class CandidatesIndependentExpendituresComparisonChartsComponent
  implements AfterViewInit, OnDestroy
{
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private dataService = inject(CandidatesIndependentExpendituresService);
  footnote = `Includes Form 460 data from previous periods and recent expenditures >$1,000 reported on Form 496. Does not include amounts from Form 460 Schedule D (unitemized contributions and independent expenditures of <$100 made this period).`;

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

  titleIndExp = 'Outside Money / Independent Expenditures';
  tooltipIndExp =
    'Expenditures supporting/opposing candidates, by committees not controlled by candidates';

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
      this.dataService.getIndependentExpendituresCandidateList(params).pipe(
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
  public preProcessedData = computed(() => this.state().data);
  public isLoading = computed(() => this.state().loading);
  // public hasError = computed(() => this.state().error);

  public processedChartData = computed(() => {
    const data = this.preProcessedData();
    if (!data) return null;

    const { candidateSeries } = data;

    // Generate the chart options object from the candidates data
    const options = getSupportedVsOpposedComparison({
      candidateSeries,
      componentWidth: this.width(),
    });

    // Calculate height for the chart based on the amount of candidates/rows of stacks
    const itemHeight = 40;
    const paddingsAndMargins = 80;
    const height = candidateSeries.length * itemHeight * 1 + paddingsAndMargins;

    return { options, height: `${height}px` };
  });
}
