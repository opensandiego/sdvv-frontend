import { Component, Input, OnChanges } from '@angular/core';

import { EChartsOption } from 'echarts';

import { getCompactFormattedCurrency } from '../../shared/number-formatter'

export interface RaisedCategory {
  name: string;
  value: number;
  color: string;
}

@Component({
  selector: 'app-total-raised-bar',
  templateUrl: './total-raised-bar.component.html',
  styleUrls: ['./total-raised-bar.component.scss']
})
export class TotalRaisedBarComponent implements OnChanges {

  @Input() raisedCategories: RaisedCategory[];

  mergeOption: EChartsOption = {};

  chartOption: EChartsOption = {
    tooltip: {
      show: true,
      trigger: 'axis',
      formatter: (params) => (params[0].data.value === null) ? '' : 
          `${params[0].data.name}:<br />$${params[0].data.value.toLocaleString()}`,
      axisPointer: {
        type: 'shadow',
      }
    },
    xAxis: {
      type: 'category',
      axisTick: {
        show: false
      },
      axisLabel: {
        interval: 0,
      },
    },
    yAxis: {
      show: false,
    },
    series: [{
      type: 'bar',
      label: {
        show: true,
        position: 'top',
        fontSize: 18,
        fontWeight: 'bold',
        formatter: (params) => 
          getCompactFormattedCurrency(params.data['value']),
      },
      itemStyle: { 
        borderRadius: [5, 5, 0, 0],
      },
    }]
  };

  constructor() { }

  ngOnChanges(): void {
    this.setChartMergeOption(this.raisedCategories);
  }

  setChartMergeOption(chartData: RaisedCategory[]): void {

    this.mergeOption = {
      xAxis: {
        data: chartData.map( category => category.name),
      },
      series: {
        data: chartData.map( item => ({
            ...item,
            itemStyle: { color: item.color, },
          })),
      },
    }

  }

}
