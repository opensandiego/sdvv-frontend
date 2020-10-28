import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Candidate } from '../../candidate';
import { Color } from 'ng2-charts';
import { MatTableDataSource } from '@angular/material';

const placeholder_data = [
  { colorCode: '#007431', industry: 'Technology', amount: 200000, percentage: 0.5 },
  { colorCode: '#00903d', industry: 'Finance', amount: 200000, percentage: 0.2 },
  { colorCode: '#00af4a', industry: 'Energy', amount: 200000, percentage: null },
  { colorCode: '#00d359', industry: 'Construction', amount: 200000, percentage: null },
  { colorCode: '#00fc6a', industry: 'Other', amount: 200000, percentage: null },
];

@Component({
  selector: 'app-candidate-card-expanded',
  templateUrl: './candidate-card-expanded.component.html',
  styleUrls: ['./candidate-card-expanded.component.scss']
})
export class CandidateCardExpandedComponent {
  @Input() candidateImg: string;
  @Output() isExpanded = new EventEmitter<boolean>();

  private _c: Candidate;

  // Industry Table
  displayedColumns: string[];
  dataSource = new MatTableDataSource();

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
    animation:{animateRotate:false},

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
    this.setDisplayedColumns();
    this.setTableData(c);
  }

  // Setting By Industry Table
  setDisplayedColumns() {
    this.displayedColumns = [
      'colorCode',
      'industry',
      'amount',
      'percentage',
    ];
  }

  setTableData(c: Candidate) {
    const topFiveIndustries = [
      {
        colorCode: '#007431',
        industry: c['by industry'][0]['industry 1'][0],
        amount: Number(c['by industry'][0]['industry 1'][1]),
        percentage: Number(c['by industry'][0]['industry 1'][2]),
      },
      {
        colorCode: '#00903d',
        industry: c['by industry'][0]['industry 2'][0],
        amount: Number(c['by industry'][0]['industry 2'][1]),
        percentage: Number(c['by industry'][0]['industry 2'][2]),
      },
      {
        colorCode: '#00af4a',
        industry: c['by industry'][0]['industry 3'][0],
        amount: Number(c['by industry'][0]['industry 3'][1]),
        percentage: Number(c['by industry'][0]['industry 3'][2]),
      },
      {
        colorCode: '#00d359',
        industry: c['by industry'][0]['industry 4'][0],
        amount: Number(c['by industry'][0]['industry 4'][1]),
        percentage: Number(c['by industry'][0]['industry 4'][2]),
      },
      {
        colorCode: '#00fc6a',
        industry: c['by industry'][0]['industry 5'][0],
        amount: Number(c['by industry'][0]['industry 5'][1]),
        percentage: Number(c['by industry'][0]['industry 5'][2]),
      },
    ];

    this.dataSource.data = topFiveIndustries;
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
      this.doughnutChartData = [
        {data: [
          this.currencyToNumber(c['in vs out district'][0].in),
          this.currencyToNumber(c['in vs out district'][0].out)
        ]}
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
