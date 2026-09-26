import { CommonModule } from '@angular/common';
import { Component, computed, inject, input } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs';
import {
  AngularEChartWrapperComponent,
  AxisLabelHoverPayload,
} from '../angular/angular-echart-wrapper.component';
import { ChartTitleComponent } from 'lib-ui-components';
import { getContributionsByCityCouncilDistricts } from '../options-phase-1.5/spending-by-city-council-district-options';
import { SpendingByCityCouncilDistrictService } from 'src/app/services/spending-by-city-council-district.service';

@Component({
  imports: [CommonModule, AngularEChartWrapperComponent, ChartTitleComponent],
  selector: 'city-council-spending-by-district-comparison-chart',
  template: `
    <div class="city-council-spending-by-district-container">
      <chart-title
        class="city-council-spending-by-district-chart-title"
        [titleText]="title()"
        [showTooltipIcon]="false"
      ></chart-title>

      @if (processedChartData(); as data) {
        <angular-echarts
          [options]="data.options"
          [height]="data.height"
          [loading]="isLoading()"
          (chartClick)="onChartClick($event)"
          (axisLabelHover)="onAxisLabelHover($event)"
          (axisLabelHoverOut)="onAxisLabelHoverOut($event)"
        ></angular-echarts>
      }
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }

      .city-council-spending-by-district-container {
      }
    `,
  ],
})
export class SpendingByDistrictChartComponent {
  year = input<string>('');

  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private dataService = inject(SpendingByCityCouncilDistrictService);
  isLoading = this.dataService.isLoading;

  // To enable axis label mouse detection, provide a series in options function
  // with the name that matches tooltipAxisLabelSeriesName.
  protected tooltipAxisLabelSeriesName = '__axis_label_tooltip_target__';

  title = computed(
    () => `Campaign Spending by City Council District ${this.year()}`,
  );

  onChartClick(params: any) {
    // Check if the user clicked either the yAxis label OR a bar in the series
    const isYAxisLabel =
      params.componentType === 'yAxis' && params.targetType === 'axisLabel';
    const isBarClick = params.componentType === 'series';

    if (isYAxisLabel || isBarClick) {
      const dataIndex = params.dataIndex;
      const districtData = this.preProcessedData()?.districtSeries[dataIndex];

      if (districtData) {
        const districtNumber = districtData.districtNumber;

        this.router.navigate([districtNumber], {
          relativeTo: this.activatedRoute,
        });
      }
    }
  }

  /** Show tooltip for yAxis + axisLabel */
  onAxisLabelHover({ params, chart }: AxisLabelHoverPayload) {
    if (params.componentType === 'yAxis' && params.targetType === 'axisLabel') {
      const option = chart?.getOption() as any;

      const seriesName = this.tooltipAxisLabelSeriesName;
      if (!seriesName) return;

      const targetSeriesIndex = option.series?.findIndex(
        (s: any) => s.name === this.tooltipAxisLabelSeriesName, //
      );

      // Only dispatch if the series is present
      if (targetSeriesIndex !== undefined && targetSeriesIndex !== -1) {
        chart?.dispatchAction({
          type: 'showTip',
          seriesIndex: targetSeriesIndex,
          dataIndex: params.dataIndex,
          position: [
            params.event.event.offsetX + 20,
            params.event.event.offsetY + 20,
          ],
        });
      }
    }
  }

  /** Hide tooltip for yAxis + axisLabel */
  onAxisLabelHoverOut({ params, chart }: AxisLabelHoverPayload) {
    if (params.componentType === 'yAxis' && params.targetType === 'axisLabel') {
      chart?.dispatchAction({
        type: 'hideTip',
      });
    }
  }

  public preProcessedData = toSignal(
    this.activatedRoute.paramMap.pipe(
      // get parameters from route
      map((params) => ({
        year: params.get('year') ?? undefined, //
      })),
      // use parameters from route to get data from service
      switchMap((params) =>
        this.dataService.getSpendingByCityCouncilDistrict(params),
      ),
      map((data) => {
        const districtSeries = data
          .map((district) => [
            {
              districtNumber: district.districtNumber,
              districtName: `District ${district.districtNumber}`,
              contributions: district.contributions,
              independentExpenditures: district.independentExpenditures,
              totalSpending:
                district.contributions + district.independentExpenditures,
            },
          ])
          .flat()
          .sort((a, b) => b.districtNumber - a.districtNumber);

        return { districtSeries };
      }),
    ),
    { initialValue: null },
  );

  public processedChartData = computed(() => {
    const data = this.preProcessedData();
    if (!data) return null;

    const { districtSeries } = data;

    // Generate the chart options object
    const options = getContributionsByCityCouncilDistricts({
      districtSeries,
      tooltipAxisLabelSeriesName: this.tooltipAxisLabelSeriesName,
    });

    // Calculate height for the chart based on the amount of rows of stacks
    const itemHeight = 40;
    const paddingsAndMargins = 80;
    const height = districtSeries.length * itemHeight * 1 + paddingsAndMargins;

    return { options, height: `${height}px` };
  });
}
