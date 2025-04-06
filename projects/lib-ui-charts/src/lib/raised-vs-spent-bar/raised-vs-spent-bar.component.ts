import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { getCompactFormattedCurrency } from '../shared/number-formatter';

import { NgxEchartsDirective, provideEchartsCore } from 'ngx-echarts';
import * as echarts from 'echarts/core';
import { EChartsOption } from 'echarts';
import { BarChart } from 'echarts/charts';
import { GridComponent, TooltipComponent } from 'echarts/components';
import { SVGRenderer } from 'echarts/renderers';
echarts.use([BarChart, TooltipComponent, SVGRenderer, GridComponent]);

@Component({
  selector: 'raised-vs-spent-bar',
  imports: [NgxEchartsDirective],
  providers: [provideEchartsCore({ echarts })],
  template: `
    <div
      class="raised-vs-spent-chart"
      echarts
      [options]="chartOption"
      [merge]="mergeOption"
    ></div>
  `,
  styles: [
    `
      .raised-vs-spent-chart {
        height: 100%;
        min-height: 150px;
        width: 100%;
        min-width: 150px;

        display: flex;
        justify-content: center;
      }
    `,
  ],
})
export class RaisedVsSpentBarComponent implements OnChanges {
  @Input() raised: number = 0;
  @Input() spent: number = 0;
  @Input() raisedBarColor?: string = 'black';
  @Input() spentBarColor?: string = 'black';

  mergeOption: EChartsOption;

  chartOption: EChartsOption = {
    grid: {
      left: 10,
      right: 10,
      bottom: 10,
    },
    tooltip: {
      show: true,
      trigger: 'item',
      formatter: (params) =>
        `${params.name}: $${params.value.toLocaleString()}`,
    },
    xAxis: {
      type: 'category',
      axisTick: {
        show: false,
      },
      axisLabel: {
        show: false,
      },
    },
    yAxis: {
      show: false,
      type: 'value',
    },
    series: [
      {
        type: 'bar',
        label: {
          show: true,
          position: 'top',
          formatter: (params) =>
            `{a|${params['name']}} \n {b|${getCompactFormattedCurrency(
              +params['value'],
              1
            )}}`,
          align: 'center',
          rich: {
            a: {
              fontSize: 14,
            },
            b: {
              fontSize: 20,
              fontWeight: 'bold',
              padding: [5, 0, 5, 0],
            },
          },
        },
        barMinWidth: 50,
        barCategoryGap: '50px',
      },
    ],
  };

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['raised'] || changes['spent']) {
      this.setChartMergeOption();
    }
  }

  setChartMergeOption(): void {
    const items = [
      {
        name: 'Spent',
        value: this.spent ? this.spent : 0,
        color: this.spentBarColor,
      },
      {
        name: 'Raised',
        value: this.raised ? this.raised : 0,
        color: this.raisedBarColor,
      },
    ];

    this.mergeOption = {
      xAxis: {
        data: items.map((items) => items.name),
      },
      series: [
        {
          data: items.map((item) => ({
            ...item,
            itemStyle: { color: item['color'] },
          })),
        },
      ],
    };
  }
}
