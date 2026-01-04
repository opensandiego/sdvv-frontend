import { Component, Input, OnChanges } from '@angular/core';

import { RaisedByLocations } from '../lib-ui-charts.models';
import { getCompactFormattedCurrency } from '../shared/number-formatter';

import { NgxEchartsDirective, provideEchartsCore } from 'ngx-echarts';
import * as echarts from 'echarts/core';
import { EChartsOption } from 'echarts';
import { BarChart } from 'echarts/charts';
import { TooltipComponent, GridComponent } from 'echarts/components';
import { SVGRenderer } from 'echarts/renderers';
echarts.use([BarChart, TooltipComponent, GridComponent, SVGRenderer]);

@Component({
  selector: 'raised-by-location-bar',
  imports: [NgxEchartsDirective],
  providers: [provideEchartsCore({ echarts })],
  template: `<div
    class="raised-by-location-chart"
    echarts
    [options]="chartOption"
    (chartInit)="onChartInit($event)"
    [merge]="mergeOptions"
  ></div>`,
  styles: [
    `
      .raised-by-location-chart {
        height: 400px;
      }
    `,
  ],
})
export class RaisedByLocationBarComponent implements OnChanges {
  @Input() raisedByLocations: RaisedByLocations;

  echartsInstance: echarts.ECharts;
  mergeOptions: EChartsOption;

  locations = [
    { name: 'In District', color: '#71B3FF' },
    { name: 'In City', color: '#3392FF' },
    { name: 'In County', color: '#337FD6' },
    { name: 'In State', color: '#336399' },
    // The element below is to create a space between
    //  the 'In State' and 'Out of State' bars
    { name: '', color: '' },
    { name: 'Out of State', color: '#BFD63B' },
  ];

  chartOption: EChartsOption = {
    tooltip: {
      show: true,
      trigger: 'axis',
      formatter: (params) =>
        params[0].data.value === null
          ? ''
          : `${params[0].data.name}: $${params[0].data.value.toLocaleString()}`,
      axisPointer: {
        type: 'shadow',
      },
    },
    xAxis: {
      show: true,
      type: 'category',
      axisTick: {
        show: false,
      },
      axisLabel: {
        interval: 0,
      },
      // data: [], // set in ngOnChanges
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: (value: number) => getCompactFormattedCurrency(value, 1),
      },
    },
    series: [
      {
        type: 'bar',
        name: 'raised-by-location-bar',
        label: {
          show: true,
          position: 'top',
          formatter: (params) =>
            getCompactFormattedCurrency(params.data['value'], 1),
          fontWeight: 'bold',
        },
        barCategoryGap: '0%',
        // data: [], // set in ngOnChanges
      },
    ],
  };

  constructor() {}

  ngOnChanges(): void {
    const chartData = this.buildChartData(this.raisedByLocations);

    this.setChartData(chartData);
  }

  onChartInit(ec: echarts.ECharts): void {
    this.echartsInstance = ec;
  }

  buildChartData(raisedRegions: RaisedByLocations): object[] {
    const chartData = [
      { value: raisedRegions['inDistrict'] },
      { value: raisedRegions['inCity'] },
      { value: raisedRegions['inCounty'] },
      { value: raisedRegions['inState'] },
      { value: null },
      { value: raisedRegions['outState'] },
    ];

    return chartData.map((item, index) => ({
      ...item,
      itemStyle: { color: this.locations[index].color },
      name: this.locations[index].name,
    }));
  }

  setChartData(chartData: object): void {
    const xAxisData = this.locations.map((location) => location.name);

    if (this.echartsInstance) {
      this.echartsInstance.setOption({
        series: [
          {
            name: 'raised-by-location-bar',
            data: chartData,
          },
        ],
        xAxis: {
          data: xAxisData,
        },
      });
    } else {
      this.chartOption.series[0].data = chartData;
      this.chartOption.xAxis['data'] = xAxisData;
    }
  }
}
