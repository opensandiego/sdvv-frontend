import { Component, Input, OnChanges } from '@angular/core';
import { EChartsOption } from 'echarts';
import { getCompactFormattedCurrency } from '../shared/number-formatter'

@Component({
  selector: 'support-oppose-bar',
  templateUrl: './support-oppose-bar.component.html',
  styleUrls: ['./support-oppose-bar.component.scss']
})
export class SupportOpposeBarComponent implements OnChanges {
  @Input() support: number;
  @Input() oppose: number;
  @Input() backgroundColor: string = 'white';
  @Input() textColor: string = '#4e4e4e';
  @Input() supportBarColor?: string = 'white';
  @Input() opposeBarColor?: string = 'white';

  mergeOption: EChartsOption = {};

  chartOption: EChartsOption = {
    grid: {
      left: 20,
      top: 10,
      right: 75,
      bottom: 0,
      height: 125,
      containLabel: true,
    },
    xAxis: {
      show: false,
      // type: 'log',
      // logBase: 2,
    },
    yAxis: {
      type: 'category',
      inverse: true,
      axisTick: {
        show: false
      },
      axisLabel: {
        show: false,
      },
    },
    tooltip: {
      show: true,
      trigger: 'item',
      formatter: (params) => `${params.name}: $${(+params.value).toLocaleString()}`,
    },
    series: [{
      type: 'bar',
      label: {
        show: true,
        position: 'right',
        formatter: (params) => 
        `{a|${params['name']}} \n {b|${getCompactFormattedCurrency(+params['value'], 1)}}`,     
        align: 'left',
        rich: {
          a: {
            fontSize: 12,
          },
          b: {
            fontSize: 16,
            fontWeight: 'bold',
            padding: [5, 0, 5, 0],
          },
        },
      },
      barWidth: 20,
    }],
  };

  constructor() { }

  ngOnChanges(): void {
    this.setChartMergeOption();
  }

  setChartMergeOption(): void {

    const rows = {
      Support: {
        name: 'Support',
        color: this.supportBarColor,
      },
      Oppose: {
        name: 'Oppose',
        color: this.opposeBarColor,
      },
    }

    this.mergeOption = {
      backgroundColor: this.backgroundColor,
      yAxis: {
        axisLabel: {
          color: this.textColor,
        },
        data: [rows.Support.name, rows.Oppose.name],
      },
      series: {
        label: {
          color: this.textColor,
        },
        data: [
          {
            name: rows.Support.name,
            value: this.support,
            itemStyle: { color: rows.Support.color, },
          },
          {
            name: rows.Oppose.name,
            value: this.oppose,
            itemStyle: { color: rows.Oppose.color, },
          },
        ],
      }
    }

  }

}
