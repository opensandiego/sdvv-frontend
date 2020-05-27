import { Component, OnInit, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Color } from 'ng2-charts';
import { Candidate } from '../../candidate';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';

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

  // Industry Table
  displayedColumns: string[]
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

        font: {
          size: 15,
          weight: 'bold',
        },

        formatter: (val, ctx) => {
          return ctx.dataset.label === 'Raised' ? `Raised\n$${val}` : `Spent\n$${val}`;
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
  doughnutChartData: any[] = [500000, 10000];

  doughnutChartColors: Color[] = [
    { backgroundColor: ['#3392ff', '#bfd63b'] },
  ];

  doughnutChartOptions: any = {
    responsive: true,

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

        font: {
          size: 15,
          weight: 'bold',
        },

        formatter: (val) => `$${this.kNumberFormatter(val)}`,
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

        font: {
          size: 16,
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

        font: {
          size: 16,
        },
        
        formatter: (val) => `Support\n$${this.kNumberFormatter(val)}`,
      },
    },
  ];

  stackedHorizontalBarChartColors: Color[] = [
    { backgroundColor: '#6964ad' },
    { backgroundColor: '#336399' },
  ];

  stackedHorizontalBarChartOptions: ChartOptions = {
    responsive: true,

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
    this.setDisplayedColumns();
    this.dataSource.data = placeholder_data;
  }

  setDisplayedColumns() {
    this.displayedColumns = [
      'colorCode',
      'industry',
      'amount',
      'percentage',
    ];
  }

  kNumberFormatter(num: number) {
    return Math.abs(num) > 9999 ? Math.sign(num)*((Math.abs(num)/1000)) + 'K' : Math.sign(num)*Math.abs(num)
  }

}
