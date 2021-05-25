import { Component, OnChanges, Input } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { RoundCurrencyPipe } from '../round-currency.pipe';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-raised-vs-spent',
  templateUrl: './raised-vs-spent.component.html',
  styleUrls: ['./raised-vs-spent.component.scss']
})
export class RaisedVsSpentComponent implements OnChanges {
  @Input() raised: number;
  @Input() spent: number;
  @Input() averageDonation: number;

  title: string;
  tooltipText: string;
  faQuestionCircle = faQuestionCircle;

  barChartType: ChartType = 'bar';
  barChartData: ChartDataSets[] = [
    {
      data: [1],
      label: 'Raised',
      barPercentage: 0.4,
      categoryPercentage: 1.0,
      backgroundColor: 'rgba(40, 154, 88, 0.8)',
      borderColor: 'rgba(40, 154, 88, 1)',
      borderWidth:1,
      hoverBackgroundColor:'rgba(40, 154, 88, 1)',
      hoverBorderColor:'rgba(40, 154, 88, 1)',

    },
    {
      data: [1],
      label: 'Spent',
      barPercentage: 0.4,
      categoryPercentage: 1.0,
      backgroundColor: 'rgba(255, 44, 25, 0.8)',
      borderColor: 'rgba(255, 44, 25, 1)',
      borderWidth:1,
      hoverBackgroundColor:'rgba(255, 44, 25, 1)',
      hoverBorderColor:'rgba(255, 44, 25, 1)',
    },
  ];

  barChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    
    title: {
      display: true,
      fontSize: 15,
      fontColor: '#16375d',
      fontStyle: 'bold',
    },

    legend: {
      display: false,
    },

    tooltips: {
      enabled: false,
    },

    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
        textAlign: 'center',
        color: '#4e4e4e',
        

        font: {
          size: 16,
          weight: 'bold',
        },
        

        formatter: (val, ctx) => {
          return ctx.dataset.label === 'Raised' ? `Raised\n$${this.mNumberFormatter(val)}` : `Spent\n$${this.mNumberFormatter(val)}`;
        },
      },
    },

    scales: {
      xAxes: [{
        
        ticks: {
          min: 0,
        },
      }],

      yAxes: [{
        display: false,
        ticks: {
          suggestedMin: 0,
          suggestedMax: 3000000
        },
      }],
    },
  }

  chartPlugins = [ pluginDataLabels ];

  constructor(private currencyDisplayPipe: RoundCurrencyPipe) { }

  ngOnChanges(): void {
    console.log(this.averageDonation)
    this.title = 'Raised v. Spent';
    this.tooltipText = 'Total campaign funds raised and spent by the candidate.';

    this.barChartData = [
      {...this.barChartData[0], data: [this.raised]},
      {...this.barChartData[1], data: [this.spent]},
    ];
  }

  mNumberFormatter(num: number) {
    return this.currencyDisplayPipe.transform(num, 1, '10000');
  }

}
