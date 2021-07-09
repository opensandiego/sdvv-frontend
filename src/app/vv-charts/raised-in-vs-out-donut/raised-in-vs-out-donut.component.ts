import { Component, Input, OnChanges } from '@angular/core';

import { EChartsOption } from 'echarts';
import { getFormattedCurrency } from '../../shared/number-formatter'

@Component({
  selector: 'app-raised-in-vs-out-donut',
  templateUrl: './raised-in-vs-out-donut.component.html',
  styleUrls: ['./raised-in-vs-out-donut.component.scss']
})
export class RaisedInVsOutDonutComponent implements OnChanges {
  @Input() inside: number;
  @Input() outside: number;

  mergeOption: EChartsOption = {};

  chartOption: EChartsOption = {
    tooltip: {
      show: true,
      trigger: 'item',
      formatter: (params) => `Raised ${params.name}:\n $${(+params.value).toLocaleString()}`,
    },
    series: [
      {
        type: 'pie',
        label: {    
          formatter: (params) => 
              `{a|${params.data['name']}}\n` +
              `{b|${getFormattedCurrency(+params.data['value'])}}`,
          rich: {
            a: {
              fontSize: '1em',
            },
            b: {
              fontSize: '1.5em',
              fontWeight: 'bold',
              padding: [10, 0, 0, 0],
            },
          },
        },
        emphasis: {
          itemStyle: { opacity: .5, },
        },
        labelLine: {
          show: false
        },
        clockwise: false,
        radius: ['50%', '90%'],
      },
    ],
  };

  constructor() { }

  ngOnChanges(): void {
    this.setChartMergeOption();
  }

  setChartMergeOption(): void {
   
    this.mergeOption = {
      series: [{
        data: [
          {
            name: 'Inside',
            value: this.inside,
            color: '#3392ff',
            itemStyle: { color: '#3392ff' },
            label: { position: 'center', }
          },
          {
            name: 'Outside',
            value: this.outside,
            color: '#bfd63b',
            itemStyle: { color: '#bfd63b' },
            label: { 
              position: 'inner', 
              textBorderColor: '#bfd63b',
              textBorderWidth: 2,
              textShadowColor: '#bfd63b',
              textShadowBlur: 8,
            }
          },
        ],
      }]
    };

  }
}
