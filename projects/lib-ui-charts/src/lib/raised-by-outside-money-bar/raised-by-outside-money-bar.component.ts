import { Component, Input, OnChanges } from '@angular/core';

import { RaisedByOutsideMoney } from '../lib-ui-charts.models';

import { getCompactFormattedCurrency } from '../shared/number-formatter';

import { NgxEchartsDirective, provideEchartsCore } from 'ngx-echarts';
import * as echarts from 'echarts/core';
import { EChartsOption } from 'echarts';
import { BarChart } from 'echarts/charts';
import { TooltipComponent } from 'echarts/components';
import { SVGRenderer } from 'echarts/renderers';
echarts.use([BarChart, TooltipComponent, SVGRenderer]);

@Component({
  selector: 'raised-by-outside-money-bar',
  imports: [NgxEchartsDirective],
  providers: [provideEchartsCore({ echarts })],
  template: `<div
    class="raised-by-outside-money-chart"
    echarts
    [options]="chartOption"
    (chartInit)="onChartInit($event)"
    [merge]="mergeOptions"
  ></div>`,
  styles: [
    `
      .raised-by-outside-money-chart {
        height: 300px;
      }
    `,
  ],
})
export class RaisedByOutsideMoneyBarComponent implements OnChanges {
  @Input() raisedByOutsideMoney: RaisedByOutsideMoney;

  echartsInstance: echarts.ECharts;
  mergeOptions: EChartsOption;

  chartOption: EChartsOption = {
    tooltip: {
      show: true,
      trigger: 'item',
      formatter: (params) =>
        `${params.data.name}: $${Math.abs(params.data.value).toLocaleString()}`,
      axisPointer: {
        type: 'shadow',
      },
    },
    xAxis: {
      type: 'value',
      axisLabel: {
        formatter: (value: number) =>
          getCompactFormattedCurrency(Math.abs(value), 1),
      },
    },
    yAxis: {
      type: 'category',
    },
    series: [
      {
        type: 'bar',
        name: 'raised-by-outside-money-in-support',
        stack: 'outside-money',
        label: {
          show: true,
          position: 'right',
          formatter: (params) =>
            getCompactFormattedCurrency(Math.abs(params.data['value'])),
          fontWeight: 'bold',
        },
        itemStyle: { color: '#3392FF' },
        // data: [], // set in ngOnChanges
      },
      {
        type: 'bar',
        name: 'raised-by-outside-money-in-opposition',
        stack: 'outside-money',
        label: {
          show: true,
          position: 'left',
          formatter: (params) =>
            getCompactFormattedCurrency(Math.abs(params.data['value'])),
          fontWeight: 'bold',
        },
        itemStyle: { color: '#6964AD' },
        // data: [], // set in ngOnChanges
      },
    ],
  };

  constructor() {}

  ngOnChanges(): void {
    this.setChartData(this.raisedByOutsideMoney);
  }

  onChartInit(ec: echarts.ECharts): void {
    this.echartsInstance = ec;
  }

  setChartData(chartData: object): void {
    let series = [
      {
        name: 'raised-by-outside-money-in-support',
        data: [
          {
            name: 'Expenditures in Support',
            value: chartData['inSupport'],
          },
        ],
      },
      {
        name: 'raised-by-outside-money-in-opposition',
        data: [
          {
            name: 'Expenditures in Opposition',
            value: -1 * chartData['inOpposition'],
          },
        ],
      },
    ];

    if (this.echartsInstance) {
      this.echartsInstance.setOption({ series });
    } else {
      this.chartOption.series[0].data = series[0].data;
      this.chartOption.series[1].data = series[1].data;
    }
  }
}
