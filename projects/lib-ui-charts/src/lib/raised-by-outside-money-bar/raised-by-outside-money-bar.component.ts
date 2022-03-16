import { Component, Input, OnChanges } from '@angular/core';

import { EChartsOption, ECharts } from 'echarts';
import { RaisedByOutsideMoney } from '../lib-ui-charts.models';

import { getCompactFormattedCurrency } from '../shared/number-formatter'

@Component({
  selector: 'raised-by-outside-money-bar',
  templateUrl: './raised-by-outside-money-bar.component.html',
  styleUrls: ['./raised-by-outside-money-bar.component.scss']
})
export class RaisedByOutsideMoneyBarComponent implements OnChanges {
  @Input() raisedByOutsideMoney: RaisedByOutsideMoney;

  echartsInstance: ECharts;
  mergeOptions: EChartsOption;

  chartOption: EChartsOption = {
    tooltip: {
      show: true,
      trigger: 'item',
      formatter: (params) =>  
        `${params.data.name}: $${Math.abs(params.data.value).toLocaleString()}`,
      axisPointer: {
        type: 'shadow',
      }
    },
    xAxis: {
      type: 'value',
      axisLabel: {
        formatter: (value: number) => 
          getCompactFormattedCurrency(Math.abs(value)),
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
          formatter: (params) => getCompactFormattedCurrency(
            Math.abs(params.data['value'])
          ),
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
          formatter: (params) => getCompactFormattedCurrency(
            Math.abs(params.data['value'])
          ),
          fontWeight: 'bold',
        },
        itemStyle: { color: '#6964AD' },
        // data: [], // set in ngOnChanges
      },
    ],
  }

  constructor() { }

  ngOnChanges(): void {
    this.setChartData(this.raisedByOutsideMoney);
  }

  onChartInit(ec: ECharts): void {
    this.echartsInstance = ec;
  }

  setChartData(chartData: object): void {

    let series = [
      {
        name: 'raised-by-outside-money-in-support',
        data:[ {
          name: 'Expenditures in Support',
          value: chartData['inSupport'],
        }]
      },
      {
        name: 'raised-by-outside-money-in-opposition',
        data: [{
          name: 'Expenditures in Opposition',
          value: -1 * chartData['inOpposition']
        }],
      },
    ]

    if (this.echartsInstance) {
      this.echartsInstance.setOption({ series });
    } else {
      this.chartOption.series[0].data = series[0].data;
      this.chartOption.series[1].data = series[1].data;
    }
  }

}
