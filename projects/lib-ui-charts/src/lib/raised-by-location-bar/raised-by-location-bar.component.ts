import { Component, Input, OnChanges } from '@angular/core';

import { EChartsOption, ECharts } from 'echarts';
import { RaisedByLocations } from '../lib-ui-charts.models';

import { getCompactFormattedCurrency } from '../shared/number-formatter'

@Component({
    selector: 'raised-by-location-bar',
    templateUrl: './raised-by-location-bar.component.html',
    styleUrls: ['./raised-by-location-bar.component.scss'],
    standalone: false
})
export class RaisedByLocationBarComponent implements OnChanges {
  @Input() raisedByLocations: RaisedByLocations;
  
  echartsInstance: ECharts;
  mergeOptions: EChartsOption;

  locations = [
    { name: 'In District',  color: '#71B3FF' },
    { name: 'In City',      color: '#3392FF' },
    { name: 'In County',    color: '#337FD6' },
    { name: 'In State',     color: '#336399' },
    // The element below is to create a space between
    //  the 'In State' and 'Out of State' bars
    { name: '',     color: '' }, 
    { name: 'Out of State', color: '#BFD63B'},
  ];

  chartOption: EChartsOption = {
    tooltip: {
      show: true,
      trigger: 'axis',
      formatter: (params) => (params[0].data.value === null) ? '' : 
          `${params[0].data.name}: $${params[0].data.value.toLocaleString()}`,
      axisPointer: {
        type: 'shadow',
      }
    },
    xAxis: {
      show: true,
      type: 'category',
      axisTick: {
        show: false
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
    series: [{
      type: 'bar',
      name: 'raised-by-location-bar',
      label: {
        show: true,
        position: 'top',
        formatter: (params) => getCompactFormattedCurrency(params.data['value'], 1),
        fontWeight: 'bold',
      },
      barCategoryGap: '0%',
      // data: [], // set in ngOnChanges
    }],
  }

  constructor() { }

  ngOnChanges(): void { 
    const chartData = this.buildChartData(this.raisedByLocations)

    this.setChartData(chartData);
  }

  onChartInit(ec: ECharts): void {
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

    return chartData.map( (item, index) => ({
      ...item,
      itemStyle: { color: this.locations[index].color, },
      name: this.locations[index].name,
    }));

  }

  setChartData(chartData: object): void {
    const xAxisData  = this.locations
      .map( location => location.name);

    if (this.echartsInstance) {
      this.echartsInstance.setOption({
        series: [{
          name: 'raised-by-location-bar',
          data: chartData,
        }],
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
