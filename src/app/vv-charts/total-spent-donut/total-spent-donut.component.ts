import { Component, Input, OnChanges } from '@angular/core';

import { EChartsOption } from 'echarts';

import { RoundCurrencyPipe } from '../round-currency.pipe';


@Component({
  selector: 'app-total-spent-donut',
  templateUrl: './total-spent-donut.component.html',
  styleUrls: ['./total-spent-donut.component.scss']
})
export class TotalSpentDonutComponent implements OnChanges {

  @Input() spendingCategories: Object[];

  private chartColor = '#FF0000';

  getFormattedLabel(params) {
    const decimalPlacesToRoundTo = 1;
    return params.percent.toFixed(decimalPlacesToRoundTo) + '%';
  }

  getFormattedTooltip(params) {
    return `<span style="font-size: 1em;">${params.data.name}<span><br />` 
         + `<span style="font-size: 1.5em;">${params.data.roundedAmount}<span>`;
  }

  getTooltipPosition(point, params, dom, rect, size) {
    return [
      (size.viewSize[0]/2) - size.contentSize[0]/2,
      (size.viewSize[1]/2) - size.contentSize[1]/2,
    ];
  }

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
        fontSize: 16,
      },
      extraCssText: 'text-align: center; width:150px; white-space:pre-wrap;'
    },
    dataset: {
      // source: set in ngOnChanges
    },
    visualMap: {
      show: false,
      // dimension: set in ngOnChanges
      // min: set in ngOnChanges
      // max: set in ngOnChanges
      inRange: {
        colorLightness: [.9, .3]
     },
    },
    series: [
      {
        type: 'pie',
        label: {
          show: true,
          position: 'inside',
          formatter: this.getFormattedLabel,
        },
        emphasis: {
          scaleSize: 10,
          label: {
            show: true,
            fontWeight: 'bold',
            fontSize: '16',
          },
        },
        radius: ['40%', '90%'],
        itemStyle: {
          color: this.chartColor,
        },
        encode: {
          // value: set in ngOnChanges
        },
      },
    ],
  };

  constructor(private currencyDisplayPipe: RoundCurrencyPipe) {  }

  addRoundedAmounts(dataset, dataKeyName: string) {
    const decimalPlacesToRoundTo = 1;

    return dataset.map( dataItem => ({
        name: dataItem.name,
        [dataKeyName]: dataItem.value,
        roundedAmount: '$' + this.currencyDisplayPipe
            .transform(dataItem.value, decimalPlacesToRoundTo, '10000'),
      })
    );

  }

  setVisualMapRange(categories: object[], categoryName: string): void {
    const values = categories.map( category => category[categoryName] );

    this.chartOption.visualMap['min'] = Math.min(...values);
    this.chartOption.visualMap['max'] = Math.max(...values);
  }

  setVisualMapDimension(categories: object[], keyName: string) {
    const keys = Object.keys(categories[0]);

    this.chartOption.visualMap['dimension'] = keys.indexOf(keyName);
  }

  setChartData(dataset: object[], keyName: string):void {
    this.chartOption.series[0].encode.value = keyName;
    this.chartOption.dataset['source'] = dataset;
  }

  ngOnChanges(): void {
    const encodeDimensionName = 'value';

    const spendingCategories = this.addRoundedAmounts(this.spendingCategories, encodeDimensionName).slice(0, 4);

    this.setChartData(spendingCategories, encodeDimensionName);

    this.setVisualMapRange(spendingCategories, encodeDimensionName);

    this.setVisualMapDimension(spendingCategories, encodeDimensionName);
  }

}
