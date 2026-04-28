import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
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
    <ng-container *ngIf="processedChartData() as data">
      <chart-title
        class="candidates-independent-expenditures-comparison-f460d-chart-title"
        [titleText]="titleIndExp"
        [tooltipText]="tooltipIndExp"
      ></chart-title>
      <angular-echarts
        [options]="data.options"
        [height]="data.height"
        (chartClick)="onChartClick($event)"
      ></angular-echarts>
    </ng-container>
  `,
})
export class CandidatesIndependentExpendituresComparisonChartsComponent {
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private dataService = inject(CandidatesIndependentExpendituresService);

  titleIndExp = 'Outside Money Independent Expenditures';
  tooltipIndExp = 'TODO: add info here';

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
          // add combinedAmount to each candidate, needed for sorting
          .map((candidate) => {
            const total = [...candidate.support, ...candidate.oppose].reduce(
              (acc, curr) => acc + curr.amount,
              0,
            );

            return {
              ...candidate,
              combinedAmount: total,
            };
          })
          .sort(
            (a, b) =>
              a.combinedAmount - b.combinedAmount ||
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

    // Generate the chart options object the candidates
    const options = getSupportedVsOpposedComparison({
      candidateSeries,
    });

    // Calculate height for the chart based on the amount of candidates/rows of stacks
    const itemHeight = 40;
    const paddingsAndMargins = 80;
    const height = candidateSeries.length * itemHeight * 1 + paddingsAndMargins;

    return { options, height: `${height}px` };
  });
}
