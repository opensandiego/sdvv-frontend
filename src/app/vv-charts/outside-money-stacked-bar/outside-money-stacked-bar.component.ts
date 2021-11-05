import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';

import { EChartsOption, ECharts, BarSeriesOption } from 'echarts';

import { getCompactFormattedCurrency } from '../../shared/number-formatter'

@Component({
  selector: 'app-outside-money-stacked-bar',
  templateUrl: './outside-money-stacked-bar.component.html',
  styleUrls: ['./outside-money-stacked-bar.component.scss']
})
export class OutsideMoneyStackedBarComponent implements OnChanges {
  @Input() opposedCommittees;
  @Input() supportCommittees;
  @Input() committeeHighlighted: string = '-1';
  @Output() committeeHighlightedChange = new EventEmitter<string>();

  defaultOpposedBarColor = 'darkRed';
  defaultSupportBarColor = 'darkGreen';

  echartsInstance: ECharts;
  mergeOption: EChartsOption;

  chartOption: EChartsOption = {
    tooltip: {
      show: true,
      trigger: 'item',
      formatter: (params) =>  
        `${params.seriesName}: $${Math.abs(params.value).toLocaleString()}`,
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
      data: [''],
      axisTick: {
        show: false,
      },
    },
  }

  constructor() { }

  ngOnChanges(): void {
    this.setChartMergeOption();
    this.updateChartHighlight();
  }

  onChartInit(ec: ECharts): void {
    this.echartsInstance = ec;
  }

  updateChartHighlight() {
    if (this.echartsInstance) {
      this.echartsInstance.dispatchAction({ type: 'downplay' });
      this.echartsInstance.dispatchAction({ 
        type: 'highlight', 
        seriesId: this.committeeHighlighted,
      });
    }
  }

  hoveredBar = (event: object) => {
    this.committeeHighlightedChange.emit(event['seriesId']+'');
  }


  getSeriesOptions(committees, defaultColor: string, direction: 'left' | 'right'): BarSeriesOption[]  {
    const directionMultiplier = (direction === 'left') ? -1 : 1; 

    const seriesTemplate = {
      type: 'bar',
      stack: 'outside-money',
      emphasis: {
        focus: 'series',
      },
      blur: {
        itemStyle: { opacity: .5, },
      },
    } as const;

    return committees.map((data) => ({
      ...seriesTemplate,
      id: data.id,
      name: data.name,
      itemStyle: { color: (data.color) ? data.color : defaultColor, },
      data: [ directionMultiplier * data.value],
    }));
  }
  
  getChartBalancer(sum1: number, sum2: number): BarSeriesOption {
    const maxBarAmount = Math.max(sum1, sum2);

    return {
      type: 'bar',
      stack: 'hidden',
      name: 'chart-balancer',
      barGap: '-100%',
      z: -10,
      itemStyle: { opacity: 0, color: 'grey'},
      silent: true,
      data: [-maxBarAmount, maxBarAmount],
    };
  }

  setChartMergeOption(): void {

    const opposedSeries: BarSeriesOption[] =
      this.getSeriesOptions(this.opposedCommittees, this.defaultOpposedBarColor, 'left');
    const supportSeries: BarSeriesOption[] = 
      this.getSeriesOptions(this.supportCommittees, this.defaultSupportBarColor, 'right');

    const seriesSumReducer = (accumulator, currentValue) => accumulator + currentValue.value;
    const opposedSum = this.opposedCommittees.reduce(seriesSumReducer, 0);
    const supportSum = this.supportCommittees.reduce(seriesSumReducer, 0);

    opposedSeries[opposedSeries.length-1]['label'] = {
      show: true,
      fontWeight: 'bold',
      position: 'left',
      formatter: getCompactFormattedCurrency(opposedSum),
    };

    supportSeries[supportSeries.length-1]['label'] = {
      show: true,
      fontWeight: 'bold',
      position: 'right',
      formatter: getCompactFormattedCurrency(supportSum),
    };

    const balancerSeries = this.getChartBalancer(opposedSum, supportSum);
   
    this.mergeOption = {
      series: [...opposedSeries, ...supportSeries, balancerSeries],
    };
  }

}
