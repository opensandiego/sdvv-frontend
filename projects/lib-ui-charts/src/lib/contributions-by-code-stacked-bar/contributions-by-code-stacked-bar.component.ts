import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { getCompactFormattedCurrency } from '../shared/number-formatter';

import { NgxEchartsDirective, provideEchartsCore } from 'ngx-echarts';
import * as echarts from 'echarts/core';
import { EChartsCoreOption } from 'echarts/core';
import { BarChart } from 'echarts/charts';
import { TooltipComponent } from 'echarts/components';
import { SVGRenderer } from 'echarts/renderers';
import { DatasetComponent } from 'echarts/components';
echarts.use([
  BarChart,
  TooltipComponent,
  DatasetComponent,
  SVGRenderer,
]);

export interface ContributionsByCode {
  ind: number;
  com: number;
  oth: number;
  pty: number;
  scc: number;
}

enum DatasetIndex {
  Monetary = 0,
  NonMonetary = 1,
}

@Component({
  selector: 'contributions-by-code-stacked-bar',
  imports: [NgxEchartsDirective],
  providers: [provideEchartsCore({ echarts })],
  template: `
    <div
      class="total-raised-chart"
      echarts
      [initOpts]="initOpts"
      (chartInit)="onChartInit($event)"
      [options]="chartOption"
      [merge]="mergeOption"
    ></div>
  `,
})
export class ContributionsByCodeStackedBarComponent implements OnChanges {
  @Input() monetaryContributionsByCode: ContributionsByCode;
  @Input() nonMonetaryContributionsByCode: ContributionsByCode;

  echartsInstance: echarts.ECharts;
  initOpts: EChartsCoreOption;
  mergeOption: EChartsCoreOption;

  chartOption: EChartsCoreOption = {
    legend: {},
    xAxis: {
      type: 'category',
      axisTick: {
        show: false,
      },
    },
    yAxis: {
      show: false,
    },
    tooltip: {
      show: true,
      trigger: 'axis',
      valueFormatter: (value) => '$' + value.toLocaleString(),
      axisPointer: {
        type: 'shadow',
      },
    },
    dataset: [],
    series: [
      {
        type: 'bar',
        name: 'Monetary',
        itemStyle: {
          color: '#007e35',
        },

        label: {
          show: true,
          position: 'top',
          fontSize: 18,
          fontWeight: 'bold',
          formatter: (params) =>
            params.data['value'] > 0
              ? getCompactFormattedCurrency(params.data['value'])
              : '',
        },
        // stack: 'contributions',
        emphasis: { focus: 'series' },
        seriesLayoutBy: 'row',
        datasetIndex: DatasetIndex.Monetary,
      },
      {
        type: 'bar',
        name: 'Non-Monetary',
        itemStyle: {
          color: '#00e25f',
        },
        label: {
          show: true,
          position: 'top',
          fontSize: 18,
          fontWeight: 'bold',
          formatter: (params) =>
            params.data['value'] > 0
              ? getCompactFormattedCurrency(params.data['value'])
              : '',
        },
        // stack: 'contributions',
        emphasis: { focus: 'series' },
        seriesLayoutBy: 'row',
        datasetIndex: DatasetIndex.NonMonetary,
      },
    ],
    //   media: [
    //     {
    //       query: { maxWidth: 375, },
    //       option: {
    //         xAxis: {
    //           axisLabel: {
    //             formatter: (value) => `${value.split(' ').join('\n')}`,
    //           },
    //         },
    //       }
    //     },

    //     {
    //       query: { minWidth: 376, },
    //       option: {
    //         xAxis: {
    //           axisLabel: {
    //             formatter: (value) => `${value}`,
    //           },
    //         },
    //       }
    //     },
    //   ],
  };

  constructor() {}

  onChartInit(ec: echarts.ECharts): void {
    this.echartsInstance = ec;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['monetaryContributionsByCode']) {
      const contributions = changes['monetaryContributionsByCode'].currentValue;
      this.updateDataset(contributions, DatasetIndex.Monetary);
    }

    if (changes['nonMonetaryContributionsByCode']) {
      const contributions =
        changes['nonMonetaryContributionsByCode'].currentValue;
      this.updateDataset(contributions, DatasetIndex.NonMonetary);
    }
  }

  updateDataset(contributions: ContributionsByCode, index: DatasetIndex): void {
    let source = Object.keys(contributions).map((key) => ({
      name: key.toUpperCase(),
      value: contributions[key],
    }));

    const dataset = {
      id: index,
      source: source,
    };

    if (this.echartsInstance) {
      this.echartsInstance.setOption({ dataset: dataset });
    } else {
      this.chartOption.dataset[index] = dataset;
    }
  }
}
