import { Component, OnInit, Input } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Color } from 'ng2-charts';
import { Candidate } from '../../candidate';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-candidate-card-expanded',
  templateUrl: './candidate-card-expanded.component.html',
  styleUrls: ['./candidate-card-expanded.component.scss']
})
export class CandidateCardExpandedComponent implements OnInit {
  @Input() candidate: Candidate;

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
  }

}
