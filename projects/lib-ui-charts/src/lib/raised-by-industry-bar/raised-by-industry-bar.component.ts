import { Component, Input, OnChanges } from '@angular/core';

import { RaisedByIndustry } from '../lib-ui-charts.models';

import { getCompactFormattedCurrency } from '../shared/number-formatter';

import { NgxEchartsDirective, provideEchartsCore } from 'ngx-echarts';
import * as echarts from 'echarts/core';
import { BarChart } from 'echarts/charts';
import {
  TooltipComponent,
  GridComponent,
  DatasetComponent,
} from 'echarts/components';
import { SVGRenderer } from 'echarts/renderers';
echarts.use([
  BarChart,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  SVGRenderer,
]);

@Component({
  selector: 'raised-by-industry-bar',
  imports: [NgxEchartsDirective],
  providers: [provideEchartsCore({ echarts })],
  template: `
    <div
      class="raised-by-industry-chart"
      echarts
      [options]="chartOption"
      [initOpts]="initOpts"
      (chartInit)="onChartInit($event)"
      [merge]="mergeOption"
    ></div>
  `,
  styles: [
    `
      .raised-by-industry-chart {
        min-width: 100px;
        width: 100%;
        min-height: 400px;
        height: 100%;
      }
    `,
  ],
})
export class RaisedByIndustryBarComponent implements OnChanges {
  @Input() raisedByIndustries: RaisedByIndustry[];
  @Input() raisedBarColor?: string = 'black';

  private dataRowsCount = 0;

  echartsInstance: echarts.ECharts;
  mergeOption: echarts.EChartsCoreOption;
  initOpts: echarts.EChartsCoreOption;

  chartOption: echarts.EChartsCoreOption = {
    grid: {
      containLabel: true,
      left: '5%',
      right: '5%',
      top: '2%',
      bottom: '2%',
    },
    tooltip: {
      show: true,
      trigger: 'axis',
      formatter: (params) =>
        `${params[0].data.name}: $${params[0].data.value.toLocaleString()}`,
      axisPointer: {
        type: 'shadow',
      },
    },
    dataset: {
      source: [], // set in ngOnChanges
    },
    xAxis: {
      position: 'top',
      axisLabel: {
        formatter: (value: number) => getCompactFormattedCurrency(value),
      },
    },
    yAxis: {
      type: 'category',
      axisTick: {
        show: false,
      },
    },
    series: [
      {
        type: 'bar',
        name: 'raised-by-industry-bar',
        encode: {
          y: 'name',
          x: 'value',
          label: 'label',
        },
        label: {
          show: true,
          position: 'right',
          formatter: (params) =>
            getCompactFormattedCurrency(params.data['value'], 1),
        },
        itemStyle: {
          color: this.raisedBarColor,
        },
        barCategoryGap: '120%',
        barMinWidth: 16,
      },
    ],
  };

  constructor() {}

  ngOnChanges(): void {
    this.setChartMergeOption();
    this.setChartHeight();
  }

  onChartInit(ec: echarts.ECharts): void {
    this.echartsInstance = ec;
  }

  setChartMergeOption(): void {
    this.mergeOption = {
      dataset: {
        source: this.raisedByIndustries,
      },
      series: [
        {
          itemStyle: {
            color: this.raisedBarColor,
          },
        },
      ],
    };
  }

  setChartHeight(): void {
    const perItemHeight = 35;
    const topOffset = 80;
    const itemCount = this.raisedByIndustries.length;

    if (this.dataRowsCount === itemCount) return;

    const height = itemCount * perItemHeight + topOffset;

    if (this.echartsInstance) {
      this.echartsInstance.resize({ height });
    } else {
      this.initOpts = { height };
    }

    this.dataRowsCount = itemCount;
  }
}
