import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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
export class CandidateCardExpandedComponent implements OnInit {
  @Input() candidate: Candidate;
  @Input() candidateImg: string;
  @Output() isExpanded = new EventEmitter<boolean>();

  test = ''

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
    },
    {
      data: [125000],
      label: 'Spent',
      barPercentage: 0.4,
      categoryPercentage: 1.0,
    },
  ];

  barChartColors: Color[] = [
    { backgroundColor: '#289a58' },
    { backgroundColor: '#ff5647' },
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
          return ctx.dataset.label === 'Raised' ? `Raised\n$${this.commaNumberFormatter(val)}` : `Spent\n$${this.commaNumberFormatter(val)}`;
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
          min: 0,
        },
      }],
    },
  }

  // In v. Out District
  doughnutChartType: ChartType = 'doughnut';
  doughnutChartData: number[] = [500000, 10000];

  doughnutChartColors: Color[] = [
    { backgroundColor: ['#3392ff', '#bfd63b'] },
  ];

  doughnutChartOptions: any = {
    responsive: true,
    maintainAspectRatio: false,

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

        font: {
          size: 16,
          weight: 'bold',
        },

        formatter: (val, ctx) => {
          return ctx.dataIndex === 0 ? `In\n$${this.kNumberFormatter(val)}` : `Out\n$${this.kNumberFormatter(val)}`;
        },
      },
    },
  }

  // Oppose v. Support Chart
  stackedHorizontalBarChartType: ChartType = 'horizontalBar';
  stackedHorizontalBarChartData: ChartDataSets[] = [
    {
      data: [5000],
      stack: 'oppose-support',
      datalabels: {
        anchor: 'start',
        align: 'start',
        textAlign: 'right',
        color: '#4e4e4e',

        font: {
          size: 16,
          weight: 'bold',
        },

        formatter: (val) => `Oppose\n$${this.kNumberFormatter(val)}`,
      },
    },
    {
      data: [200000],
      stack: 'oppose-support',
      datalabels: {
        anchor: 'end',
        align: 'end',
        textAlign: 'left',
        color: '#4e4e4e',

        font: {
          size: 16,
          weight: 'bold',
        },
        
        formatter: (val) => `Support\n$${this.kNumberFormatter(val)}`,
      },
    },
  ];

  stackedHorizontalBarChartColors: Color[] = [
    { backgroundColor: '#FF7119' },
    { backgroundColor: '#336399' },
  ];

  stackedHorizontalBarChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,

    layout: {
      padding: {
        left: 100,
        right: 100,
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
        gridLines: {
          color: "rgba(0, 0, 0, 0)",
        }
      }],

      yAxes: [{
        display: false,
        gridLines: {
          color: "rgba(0, 0, 0, 0)",
        }
      }],
    },
  }

  constructor() { }

  ngOnInit() {
    this.setChartsData();
    this.setDisplayedColumns();
    this.setTableData();
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

  setTableData() {
    const topFiveIndustries = [
      {
        colorCode: '#007431',
        industry: this.candidate['by industry'][0]['industry 1'][0],
        amount: Number(this.candidate['by industry'][0]['industry 1'][1]),
        percentage: Number(this.candidate['by industry'][0]['industry 1'][2]),
      },
      {
        colorCode: '#007431',
        industry: this.candidate['by industry'][0]['industry 2'][0],
        amount: Number(this.candidate['by industry'][0]['industry 2'][1]),
        percentage: Number(this.candidate['by industry'][0]['industry 2'][2]),
      },
      {
        colorCode: '#007431',
        industry: this.candidate['by industry'][0]['industry 3'][0],
        amount: Number(this.candidate['by industry'][0]['industry 3'][1]),
        percentage: Number(this.candidate['by industry'][0]['industry 3'][2]),
      },
      {
        colorCode: '#007431',
        industry: this.candidate['by industry'][0]['industry 4'][0],
        amount: Number(this.candidate['by industry'][0]['industry 4'][1]),
        percentage: Number(this.candidate['by industry'][0]['industry 4'][2]),
      },
      {
        colorCode: '#007431',
        industry: this.candidate['by industry'][0]['industry 5'][0],
        amount: Number(this.candidate['by industry'][0]['industry 5'][1]),
        percentage: Number(this.candidate['by industry'][0]['industry 5'][2]),
      },
    ];

    this.dataSource.data = topFiveIndustries;
  }

  // Setting Chart Data
  setChartsData() {
    // Raised v. Spent
    this.barChartData[0].data[0] = this.currencyToNumber(this.candidate['raised vs spent'][0].Raised);
    this.barChartData[1].data[0] = this.currencyToNumber(this.candidate['raised vs spent'][0].Spent);

    // In V. Out District
    this.doughnutChartData[0] = this.currencyToNumber(this.candidate['in vs out district'][0].in);
    this.doughnutChartData[1] = this.currencyToNumber(this.candidate['in vs out district'][0].out);

    // Oppose v. Support
    this.stackedHorizontalBarChartData[0].data[0] = this.currencyToNumber(this.candidate['oppose']);
    this.stackedHorizontalBarChartData[1].data[0] = this.currencyToNumber(this.candidate['support']);
  }

  // Convert Currency String to Number
  currencyToNumber(currencyString: string) {
    return Number(currencyString.replace(/[^0-9\.-]+/g,""))
  }

  // Adding K At The End of Values Over 9999 (i.e. 10K, 100K)
  kNumberFormatter(num: number) {
    return Math.abs(num) > 9999 ? Math.sign(num)*((Math.abs(num)/1000)) + 'K' : this.commaNumberFormatter(Math.sign(num)*Math.abs(num));
  }

  // Adding Comma Separators for Values Over 999
  commaNumberFormatter(num: number) {
    return num.toLocaleString('en');
  }

  close() {
    this.isExpanded.emit(false);
  }

}
