import { Component, OnChanges, Input } from '@angular/core';

import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

import { RoundCurrencyPipe } from '../round-currency.pipe'

@Component({
  selector: 'raised-in-out-donut',
  templateUrl: './raised-in-out-donut.component.html',
  styleUrls: ['./raised-in-out-donut.component.scss'],
})
export class RaisedInOutDonutComponent implements OnChanges {
  @Input() inside: number;
  @Input() outside: number;
  @Input() areaName: string; // Example: City of San Diego
  @Input() jurisdiction: string; // Example: City, District
  @Input() jurisdictionSuffix?: string; // Example '1', '5'

  faQuestionCircle = faQuestionCircle;

  title: string;
  tooltipText: string;
  jurisdictionComplete: string;


  doughnutChartType: ChartType = 'doughnut';
  doughnutChartData: ChartDataSets[] = [{
    data: [1,1],
  }];
  
  doughnutChartLabels: Label[];


  doughnutChartColors: Color[] = [
    { backgroundColor: ['#3392ff', '#bfd63b'] },
  ];

  doughnutChartOptions: ChartOptions = {
    // responsive: true,
    responsive: false,
    maintainAspectRatio: false,
    cutoutPercentage: 60,
    animation: {
      animateRotate: true,
    },

    legend: {
      display: false,
    },

    tooltips: {
      enabled: false,
    },

    plugins: {
      datalabels: {
        anchor: 'start',
        align: 'start',
        color: '#4e4e4e',
        textAlign:'center',
        display: 'auto',

        font: {
          size: 16,
          weight: 'bold',
        },

        formatter: (value, context) => {
          return this.doughnutChartLabels[context.dataIndex];
        },
      },
    },
  }

  chartPlugins = [ pluginDataLabels ];


  constructor(private currencyDisplayPipe: RoundCurrencyPipe) {}

  ngOnChanges() {
    
    this.jurisdictionComplete = this.jurisdiction;
    this.jurisdictionComplete += (this.jurisdictionSuffix) ? ` ${this.jurisdictionSuffix}` : '';
    
    this.title = `In vs. Out of ${this.jurisdictionComplete}`;
    this.tooltipText = `Total campaign funds raised in the ${this.areaName} versus funds raised outside of city limits.`;
    
    this.doughnutChartData[0].data = [this.inside, this.outside];

    this.doughnutChartLabels = [
      `In\n$${this.mNumberFormatter(this.inside)}`,
      `Out\n$${this.mNumberFormatter(this.outside)}`
    ];

  }

  mNumberFormatter(num: number) {
    return this.currencyDisplayPipe.transform(num, 1, '10000');
  }

}
