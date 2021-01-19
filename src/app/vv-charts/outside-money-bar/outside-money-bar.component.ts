import { Component, OnChanges, Input } from '@angular/core';

import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';

import { RoundCurrencyPipe } from '../round-currency.pipe';

@Component({
  selector: 'outside-money-bar',
  templateUrl: './outside-money-bar.component.html',
  styleUrls: ['./outside-money-bar.component.scss'],
})
export class OutsideMoneyBarComponent implements OnChanges {
  @Input() support: number;
  @Input() oppose: number;
  
  title: string = 'Outside Money';
  tooltipText: string = 'Amount of money raised and spent by independent expenditure committees spent in support or opposition of a candidate but not contributed directly to their campaign.';
  totalExpenditures: string;


  stackedHorizontalBarChartType: ChartType = 'horizontalBar';
  stackedHorizontalBarChartData: ChartDataSets[] = [
    {
      data: [1],
      barPercentage: 0.4,
      categoryPercentage: 1.0,
      backgroundColor: 'rgba(0, 119, 255, 0.8)',
      borderColor: 'rgba(0, 119, 255, 1)',
      borderWidth:1,
      hoverBackgroundColor:'rgba(0, 119, 255, 1)',
      hoverBorderColor:'rgba(0, 119, 255, 1)',
    },

    {
      data: [1],
      barPercentage: 0.4,
      categoryPercentage: 1.0,
      backgroundColor: 'rgba(255, 113, 25, 0.8)',
      borderColor: 'rgba(255, 113, 25, 1)',
      borderWidth:1,
      hoverBackgroundColor:'rgba(255, 113, 25, 1)',
      hoverBorderColor:'rgba(255, 113, 25, 1)',
    },
   
  ];

  stackedHorizontalBarChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,

    layout: {
      padding: {
        left: 0,
        right: 20,
      },
    },

    legend: {
      display: false,
    },

    tooltips: {
      enabled: false,
    },

    scales: {
      xAxes: [{
        display: false,
        
        ticks: {
          suggestedMin: 0,
          suggestedMax: 900000
        }
      }],

      yAxes: [{
        display: false,
        gridLines: {
          color: "#727272",
        },
        ticks: {
          min: 0,
        }

      }],
    },
    plugins: { datalabels: {
      anchor: 'end',
      align: 'end',
      textAlign: 'left',
      color: '#ffffff',

      font: {
        size: 16,
        weight: 'bold',
      },

      formatter: function(value, context) {
        return context.dataset.label;
      }
    }}
  }

  chartPlugins = [ pluginDataLabels ];


  constructor(private currencyDisplayPipe: RoundCurrencyPipe) {}

  ngOnChanges() {

    this.stackedHorizontalBarChartData[0].data = [this.support];
    this.stackedHorizontalBarChartData[0].label = 
      `Support\n$${this.mNumberFormatter(this.support)}`;

    this.stackedHorizontalBarChartData[1].data = [this.oppose];
    this.stackedHorizontalBarChartData[1].label = 
      `Oppose\n$${this.mNumberFormatter(this.oppose)}`;

    const total = this.support + this.oppose;
    this.totalExpenditures = `$${this.mNumberFormatter(total)}`;

  }

  mNumberFormatter(num: number) {
    return this.currencyDisplayPipe.transform(num, 1, '10000');
  }

}
