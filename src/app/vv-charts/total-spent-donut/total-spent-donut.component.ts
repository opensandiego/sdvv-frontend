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
  
  formatLabel(params) {
    const decimalPlacesToRoundTo = 1;
    return params.percent.toFixed(decimalPlacesToRoundTo) + '%';
  }

  formatTooltip(params) {
    return `<span style="font-size: 1em;">${params.data.name}<span><br />` 
         + `<span style="font-size: 1.5em;">${params.data.roundedAmount}<span>`;
  }
  
  chartOption: EChartsOption = {
    tooltip: {
      show: true,
      position: function(point, params, dom, rect, size) {
        return [
          (size.viewSize[0]/2) - size.contentSize[0]/2,
          (size.viewSize[1]/2) - size.contentSize[1]/2,
        ];
      },
      formatter: this.formatTooltip,
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
    series: [
      {
        type: 'pie',
        label: {
          show: true,
          position: 'inside',
          formatter: this.formatLabel,
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

        color: ['#830000', '#B40000', '#D30000', '#FF0000', '#FFADAD'].reverse(),

        encode: {
          value: 'value', // references a parameter in dataset
        },
      },
    ],
  };

  constructor(private currencyDisplayPipe: RoundCurrencyPipe) {  }

  addRoundedAmounts(dataset) {
    const decimalPlacesToRoundTo = 1;

    return dataset.map( dataItem => ({ 
        name: dataItem.name,
        value: dataItem.value,
        roundedAmount: '$' + this.currencyDisplayPipe
            .transform(dataItem.value, decimalPlacesToRoundTo, '10000')
      })
    );

  }

  ngOnChanges(): void {
    const spendingCategories = this.addRoundedAmounts(this.spendingCategories);

    this.chartOption.dataset['source'] = spendingCategories.slice(0, 4);
  }

}
