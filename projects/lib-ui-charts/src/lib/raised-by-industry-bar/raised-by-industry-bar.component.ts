import { Component, Input, OnChanges } from '@angular/core';

import { EChartsOption, ECharts } from 'echarts';
import { RaisedByIndustry } from '../lib-ui-charts.models';

import { getCompactFormattedCurrency } from '../shared/number-formatter'

@Component({
    selector: 'raised-by-industry-bar',
    templateUrl: './raised-by-industry-bar.component.html',
    styleUrls: ['./raised-by-industry-bar.component.scss'],
    standalone: false
})
export class RaisedByIndustryBarComponent implements OnChanges {

  @Input() raisedByIndustries: RaisedByIndustry[];
  @Input() raisedBarColor?: string = 'black';

  private dataRowsCount = 0;

  echartsInstance: ECharts;
  mergeOption: EChartsOption;
  initOpts: EChartsOption;
  
  chartOption: EChartsOption = {
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
      }
    },
    dataset: {
      source: [],  // set in ngOnChanges
    },
    xAxis: {
      position: 'top',
      axisLabel: {
        formatter: (value: number) => 
          getCompactFormattedCurrency(value),
      },
    },
    yAxis: {
      type: 'category',
      axisTick: {
        show: false
      },
    },
    series: [{
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
    }],
  }

  constructor() {  }

  ngOnChanges(): void { 
    this.setChartMergeOption();
    this.setChartHeight();
  }

  onChartInit(ec: ECharts): void {
    this.echartsInstance = ec;
  }

  setChartMergeOption(): void {
    this.mergeOption = {
      dataset: {
        source: this.raisedByIndustries,
      },
      series: [{
        itemStyle: {
          color: this.raisedBarColor,
        },
      }]
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
