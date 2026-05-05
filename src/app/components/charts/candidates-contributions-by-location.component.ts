import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { AngularEChartWrapperComponent } from './angular/angular-echart-wrapper.component';
import { ChartTitleComponent } from 'lib-ui-components';
import { CandidatesContributionsByLocationService } from 'src/app/services/candidates-contributions-by-location.service';
import { getContributionsByInOutCity } from './options-phase-1/contributions-by-location-options';

@Component({
  imports: [CommonModule, AngularEChartWrapperComponent, ChartTitleComponent],
  selector: 'candidates-contributions-by-location-comparison-chart',
  template: `
    <div class="candidates-contributions-by-location-comparison-container">
      <chart-title
        class="candidates-contributions-by-location-comparison-f460ac-chart-title"
        [titleText]="titleContribLoc"
        [tooltipText]="tooltipContribLoc"
      ></chart-title>
      <ng-container *ngIf="processedChartData() as data">
        <angular-echarts
          [options]="data.options"
          [height]="data.height"
          [loading]="isLoading()"
          (chartClick)="onChartClick($event)"
        ></angular-echarts>
      </ng-container>
      <div class="candidates-contributions-by-location-comparison-footnote">
        <p>
          Optional notes here about what data is in or not in the chart above:
          ... Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
    </div>
  `,
  styles: [
    `
      .candidates-contributions-by-location-comparison-container {
        margin: 20px;
        padding: 15px 25px 15px 25px;
        background: #fff;
        box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.21);

        .candidates-contributions-by-location-comparison-footnote {
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
export class CandidateContributionsByLocationComparisonChartsComponent {
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private dataService = inject(CandidatesContributionsByLocationService);
  isLoading = this.dataService.isLoading;

  titleContribLoc = 'Individual Contributions';
  tooltipContribLoc = 'TODO: add info here';

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
        this.dataService.getContributionsByLocation(params),
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
          .map((candidate) => [
            {
              candidateId: candidate.candidateId,
              candidateName: candidate.candidateName,
              inCity: candidate.f460a.inCity + candidate.f460c.inCity,
              outCity: candidate.f460a.outCity + candidate.f460c.outCity,
              totalContributions: candidate.totalContributions,
            },
          ])
          .flat()
          .sort((a, b) =>
            // a.totalContributions - b.totalContributions ||
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
    const options = getContributionsByInOutCity({
      candidateSeries,
    });

    // Calculate height for the chart based on the amount of candidates/rows of stacks
    const itemHeight = 40;
    const paddingsAndMargins = 80;
    const height = candidateSeries.length * itemHeight * 1 + paddingsAndMargins;

    return { options, height: `${height}px` };
  });
}
