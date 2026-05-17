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
import { map, switchMap } from 'rxjs';
import { AngularEChartWrapperComponent } from './angular/angular-echart-wrapper.component';
import { ChartTitleComponent } from 'lib-ui-components';
import { CandidatesIndependentExpendituresService } from 'src/app/services/candidates-independent-expenditures.service';
import { getSupportedVsOpposedComparison } from './options-phase-1/independent-expenditures-options';

/**
 * Combine filers with the same name and add the combined amounts for each duplicate
 */
function getUniqueFilers<
  T extends {
    filerName: string;
    amount: number;
  },
>({ filers }: { filers: T[] }) {
  const merged = filers.reduce((acc, current) => {
    const existing = acc.get(current.filerName.toLowerCase());

    if (existing) {
      existing.amount += current.amount;
    } else {
      acc.set(current.filerName.toLowerCase(), { ...current });
    }

    return acc;
  }, new Map<string, T>());

  // Convert the Map back into an array
  const result: T[] = Array.from(merged.values());

  return result;
}

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
  isLoading = this.dataService.isLoading;
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
  tooltipIndExp = 'Expenditures supporting/opposing candidates, by committees not controlled by candidates';

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

  public preProcessedData = toSignal(
    this.activatedRoute.paramMap.pipe(
      // get parameters from route
      map((params) => ({
        year: params.get('year') ?? undefined,
        office: params.get('office_name') ?? undefined,
        district: params.get('district_number') ?? undefined,
      })),
      // use parameters from route to get data from service
      switchMap((params) =>
        this.dataService.getCandidatesIndependentExpenditures(params),
      ),
      map((data) => {
        // if any candidate has the inGeneralElection condition set then filter all by their inGeneralElection
        const hasGeneral = data.some(
          (candidate) => candidate.inGeneralElection,
        );

        return hasGeneral
          ? data.filter((candidate) => candidate.inGeneralElection)
          : data;
      }),
      map((data) => {
        const candidateSeries = data
          // combine f460d and s496 support and oppose filers and amounts for each candidate
          .map((candidate) => [
            {
              candidateId: candidate.candidateId,
              candidateName: candidate.candidateName,
              support: getUniqueFilers({
                filers: [...candidate.f460d.support, ...candidate.s496.support],
              }),
              oppose: getUniqueFilers({
                filers: [...candidate.f460d.oppose, ...candidate.s496.oppose],
              }),
            },
          ])
          .flat()
          // commented this out so that the candidate data is sorted by name
          // add combinedAmount to each candidate, needed for sorting
          // .map((candidate) => {
          //   const total = [...candidate.support, ...candidate.oppose].reduce(
          //     (acc, curr) => acc + curr.amount,
          //     0,
          //   );

          //   return {
          //     ...candidate,
          //     combinedAmount: total,
          //   };
          // })
          .sort((a, b) =>
            // a.combinedAmount - b.combinedAmount ||
            b.candidateName.localeCompare(a.candidateName),
          );

        return { candidateSeries };
      }),
    ),
    { initialValue: null },
  );

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
