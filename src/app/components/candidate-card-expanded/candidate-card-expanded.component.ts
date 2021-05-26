import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Candidate } from '../../candidate';

import { faQuestionCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-candidate-card-expanded',
  templateUrl: './candidate-card-expanded.component.html',
  styleUrls: ['./candidate-card-expanded.component.scss']
})
export class CandidateCardExpandedComponent {
  @Input() candidateImg: string;
  @Output() isExpanded = new EventEmitter<boolean>();

  public _c: Candidate;
  faQuestionCircle = faQuestionCircle;
  faTimesCircle = faTimesCircle;
  // All Charts
  chartPlugins = [pluginDataLabels];

  // Oppose v. Support Chart
  stackedHorizontalBarChartType: ChartType = 'horizontalBar';
  stackedHorizontalBarChartData: ChartDataSets[] = [
    {
      data: [200000],
      barPercentage: 0.4,
      categoryPercentage: 1.0,
      backgroundColor: 'rgba(0, 119, 255, 0.8)',
      borderColor: 'rgba(0, 119, 255, 1)',
      borderWidth:1,
      hoverBackgroundColor:'rgba(0, 119, 255, 1)',
      hoverBorderColor:'rgba(0, 119, 255, 1)',

      datalabels: {
        anchor: 'end',
        align: 'end',
        textAlign: 'left',
        color: '#ffffff',


        font: {
          size: 16,
          weight: 'bold',
        },
        
        formatter: (val) => `Support\n$${this.mNumberFormatter(val)}`,
      },
    },

    {
      data: [5000],
      barPercentage: 0.4,
      categoryPercentage: 1.0,
      backgroundColor: 'rgba(255, 113, 25, 0.8)',
      borderColor: 'rgba(255, 113, 25, 1)',
      borderWidth:1,
      hoverBackgroundColor:'rgba(255, 113, 25, 1)',
      hoverBorderColor:'rgba(255, 113, 25, 1)',

      datalabels: {
        anchor: 'end',
        align: 'end',
        textAlign: 'left',
        color: '#ffffff',

        font: {
          size: 16,
          weight: 'bold',
        },

        formatter: (val) => `Oppose\n$${this.mNumberFormatter(val)}`,
      },
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
  }

  constructor() { }

  get candidate() {
    return this._c;
  }

  @Input() set candidate(c: Candidate) {
    this._c = c;
    // console.debug(c);
    this.setChartsData(c);
  }

  // Setting Chart Data
  setChartsData(c: Candidate) {
    // Oppose v. Support
    this.stackedHorizontalBarChartData = [
      {...this.stackedHorizontalBarChartData[0], data: [this.currencyToNumber(c['support'])]},
      {...this.stackedHorizontalBarChartData[1], data: [this.currencyToNumber(c['oppose'])]}
    ];
  }

  // Convert Currency String to Number
  currencyToNumber(currencyString: string) {
    return Number(currencyString.replace(/[^0-9\.-]+/g,""))
  }

  // Adding K At The End of Values Over 9999 (i.e. 10K, 100K)
  mNumberFormatter(num: number) {
    return Math.abs(num) > 1e6 ? Math.sign(num)*((Math.round(num/1e4))/100) + 'M' : this.commaNumberFormatter(Math.sign(num)*Math.abs(num));
  }

  // Adding Comma Separators for Values Over 999
  commaNumberFormatter(num: number) {
    return num.toLocaleString('en');
  }

  close() {
    this.isExpanded.emit(false);
  }
  
  //convert string to int
  ConvertToInt(val){
    return parseInt(val);
  }

}
