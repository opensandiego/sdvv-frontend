import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { EChartsOption, ECharts } from 'echarts';

import { getCompactFormattedCurrency } from '../shared/number-formatter'

export interface Category {
  id: string;
  name: string;
  value: number;
  percent: number;
  color: string;
}

@Component({
  selector: 'total-spent-donut',
  templateUrl: './total-spent-donut.component.html',
  styleUrls: ['./total-spent-donut.component.scss']
})
export class TotalSpentDonutComponent implements OnChanges {

  @Input() spendingCategories: Category[];
  @Input() categoryHighlighted: string = '-1';
  @Output() categoryHighlightedChange = new EventEmitter<string>();

  echartsInstance: ECharts;
  chartHeight = 250;
  chartWidth = 250;

  mergeOption: EChartsOption = {};

  chartOption: EChartsOption = {
    tooltip: {
      show: true,
      position: this.getTooltipPosition,
      formatter: this.getFormattedTooltip,
      backgroundColor: 'rgba(0, 0, 0, 0.0)',
      borderWidth: 0,
      shadowColor: 'rgba(0, 0, 0, 0.0)',
      textStyle: {
        fontWeight: 'bolder',
        fontSize: 10,
      },
      extraCssText: 'text-align: center; width:90px; white-space:pre-wrap; line-height: 16px;',
    },
    series: [
      {
        type: 'pie',
        label: {
          show: true,
          position: 'inside',
          fontSize: 12,
          formatter: (params) => (params.data['percent']/100)
            .toLocaleString("en", { style: "percent", minimumFractionDigits: 1 }),
        },
        emphasis: {
          scaleSize: 10,
          label: {
            show: true,
            fontWeight: 'bold',
            fontSize: 14,
          },
        },
        radius: ['40%', '90%'],
      },
    ],
  };

  constructor( ) {  }

  ngOnChanges(): void {    
    this.setChartMergeOption();
    this.updateChartHighlight();
  }

  onChartInit(ec: ECharts): void {
    this.echartsInstance = ec;
  }

  setChartMergeOption(): void {

    this.mergeOption = {
      series: [{
        data: this.spendingCategories.map( (item) => ({
          ...item,
          itemStyle: { color: item['color'], },
        }))
      }],
    };

  }

  updateChartHighlight() {
    if (this.echartsInstance) {
      this.echartsInstance.dispatchAction({ type: 'downplay' });
      this.echartsInstance.dispatchAction({ 
        type: 'highlight', 
        dataIndex: parseInt(this.categoryHighlighted),
      });

      this.echartsInstance.dispatchAction({ type: 'hideTip' });
      this.echartsInstance.dispatchAction({ 
        type: 'showTip', 
        seriesIndex: 0,
        dataIndex: parseInt(this.categoryHighlighted),
      });
    }
  }


  hoveredSlice = (event: object) => {
    this.categoryHighlightedChange.emit(event['dataIndex']+'')
  }
  
  getFormattedTooltip(params) {
    return `<div style="font-size: 1em; margin-bottom: 8px">${params.data.name}</div>` 
         + `<div style="font-size: 1.5em;">${getCompactFormattedCurrency(params.data.value)}</div>`;
  }

  getTooltipPosition(point, params, dom, rect, size) {
    return [
      (size.viewSize[0]/2) - size.contentSize[0]/2,
      (size.viewSize[1]/2) - size.contentSize[1]/2,
    ];
  }

}
