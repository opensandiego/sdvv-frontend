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

  //For By Industry Table
  displayedColumns: string[]
  dataSource = new MatTableDataSource();

  // For Raised v. Spent Chart
  barChartPlugins = [ pluginDataLabels ];

  barChartType: ChartType = 'bar';
  barChartData: ChartDataSets[] = [
    {
      data: [150000],
      label: 'Raised',
      datalabels: {
        color: '#289a58',
      },
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
        },
        formatter: (val, ctx) => {
          return ctx.dataset.label === 'Raised' ? `Raised\n$${val}` : `Spent\n$${val}`;
        },
      }
    },

    scales: {
      xAxes: [{
        ticks: {
          min: 0,
        },
      }],

      yAxes:[{
        display: false,
        ticks: {
          min: 0,
        },
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

}
