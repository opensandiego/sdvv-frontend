import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Candidate } from '../../candidate';
import { Color } from 'ng2-charts';

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

  // Raised v. Spent Chart
  barChartType: ChartType = 'bar';
  barChartData: ChartDataSets[] = [
    {
      data: [150000],
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
      data: [150000],
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

  // In v. Out District
  doughnutChartType: ChartType = 'doughnut';
  doughnutChartData: ChartDataSets[] = [
    {
      data: [5000, 1200],
      
    }
  ];

  doughnutChartColors: Color[] = [
    { backgroundColor: ['#3392ff', '#bfd63b'] },
  ];

  doughnutChartOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    cutoutPercentage:60,
    animation:{animateRotate:true},

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

        font: {
          size: 16,
          weight: 'bold',
          
        },

        formatter: (val, ctx) => {
          return ctx.dataIndex === 0 ? `In\n$${this.mNumberFormatter(val)}` : `Out\n$${this.mNumberFormatter(val)}`;
        },
      },
    },
  }

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
    // Raised v. Spent
    this.barChartData = [
      {...this.barChartData[0], data: [this.currencyToNumber(c['raised vs spent'][0].Raised)]},
      {...this.barChartData[1], data: [this.currencyToNumber(c['raised vs spent'][0].Spent)]}
    ];

    // In V. Out District
    if (c['in vs out district']) {
      this.doughnutChartData[0].data = [
        this.currencyToNumber(c['in vs out district'][0].in),
        this.currencyToNumber(c['in vs out district'][0].out)
      ];
    }

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
