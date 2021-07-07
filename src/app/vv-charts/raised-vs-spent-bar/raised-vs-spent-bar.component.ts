import { Component, Input, OnChanges } from '@angular/core';

import { EChartsOption } from 'echarts';

import { getCompactFormattedCurrency } from '../../shared/number-formatter'

@Component({
  selector: 'app-raised-vs-spent-bar',
  templateUrl: './raised-vs-spent-bar.component.html',
  styleUrls: ['./raised-vs-spent-bar.component.scss']
})
export class RaisedVsSpentBarComponent implements OnChanges {
  @Input() raised: number;
  @Input() spent: number;

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
        show: false
      },
      axisLabel: {
        show: false
      },
    },
    yAxis: {
      show: false,
      type: 'value',
    },
    series: [{
      type: 'bar',
      label: {
        show: true,
        position: 'top',
        formatter: (params) => 
          `{a|${params['name']}} \n {b|${getCompactFormattedCurrency(+params['value'])}}`,
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
    }],
  };

  constructor() { }

  ngOnChanges(): void {
    this.setChartMergeOption();
  }

  setChartMergeOption(): void {

    const items = [
      {
        name: 'Raised',
        value: this.raised,
        color: '#289a58',
      },
      {
        name: 'Spent',
        value: this.spent,
        color: '#ff2c19',
      },
    ]; 

    this.mergeOption = {
      xAxis: {
        data: items.map( items => items.name ),
      },
      series: [{
        data: items.map( (item) => ({
          ...item,
          itemStyle: { color: item['color'], },
        }))
      }],
    };

  }
  
}
