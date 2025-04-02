import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

import { EChartsOption, ECharts, BarSeriesOption } from 'echarts';
import { NgxEchartsModule } from 'ngx-echarts';
import { Committee } from '../lib-ui-charts.models';

import { getCompactFormattedCurrency } from '../shared/number-formatter'

@Component({
    selector: 'outside-money-stacked-bar-v2',
    imports: [
        NgxEchartsModule,
    ],
    styleUrls: ['./outside-money-stacked-bar.component.scss'],
    template: `
    <div class="outside-money-stacked-bar-chart" echarts 
      [options]="chartOption"
      [merge]="mergeOption"

      (chartInit)="onChartInit($event)"
      (chartMouseOver)="hoveredBar($event)"
      (chartMouseOut)="hoveredBar({ seriesId: '-1' })"
    ></div>  
  `
})
export class OutsideMoneyStackedBarComponentV2 implements OnChanges {
  @Input() opposedCommittees: Committee[];
  @Input() supportCommittees: Committee[];
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
      extraCssText: "width: 300px; white-space: pre-wrap;",
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
      axisLine: {
        lineStyle: {
          color: 'black',
          width: 3,
        }
      },
      data: [''],
      axisTick: {
        show: false,
      },
    },
    grid: {
      // left: 0,
      top: 10,
      // right: 0,
      bottom: 40
    },
  }

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {

    if (changes['opposedCommittees'] || changes['supportCommittees']) {
      this.setChartMergeOption();
    }

    if (changes['committeeHighlighted']) {
      this.updateChartHighlight();
    }

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
    let minRange = -sum1;
    let maxRange = sum2;

    if (sum1 > 0 && sum2 > 0) {
      const barAmount = Math.max(sum1, sum2);
      minRange = -barAmount;
      maxRange = barAmount;
    }

    return {
      type: 'bar',
      stack: 'hidden',
      name: 'chart-balancer',
      barGap: '-100%',
      z: -10,
      itemStyle: { opacity: 0, color: 'grey'},
      silent: true,
      data: [minRange, maxRange],
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

    if (opposedSeries.length > 0) {
      opposedSeries[opposedSeries.length-1]['label'] = {
        show: true,
        fontWeight: 'bold',
        position: 'left',
        formatter: getCompactFormattedCurrency(opposedSum),
      };
    }

    if (supportSeries.length > 0) {
      supportSeries[supportSeries.length-1]['label'] = {
        show: true,
        fontWeight: 'bold',
        position: 'right',
        formatter: getCompactFormattedCurrency(supportSum),
      };
    }

    const balancerSeries = this.getChartBalancer(opposedSum, supportSum);

    if (this.echartsInstance) {
      this.echartsInstance.setOption(this.chartOption, true);
    }

    this.mergeOption = {
      series: [...opposedSeries, ...supportSeries, balancerSeries],
    };
  }

}
