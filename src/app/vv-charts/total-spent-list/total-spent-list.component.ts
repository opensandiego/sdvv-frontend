import { Component, Input, OnInit } from '@angular/core';
import { Candidate } from '../../candidate';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-total-spent-list',
  templateUrl: './total-spent-list.component.html',
  styleUrls: ['./total-spent-list.component.scss']
})
export class TotalSpentListComponent implements OnInit {
  private _c: Candidate;
  get candidate() {
    return this._c;
  }

  @Input() set candidate(candidate: Candidate) {
    this._c = candidate;
    this.setDisplayedColumns();
    this.setTableData(candidate);
  }

  dataSource = new MatTableDataSource();
  displayedColumns: any[];

  constructor() { }

  ngOnInit(): void {
  }

  setDisplayedColumns() {
    this.displayedColumns = [
      'colorCode',
      'industry',
      'amount',
      'percentage',
    ];
  }

  setTableData(candidate: Candidate) {
    const topFiveIndustries = [
      {
        colorCode: '#007431',
        industry: candidate['by industry'][0]['industry 1'][0],
        amount: Number(candidate['by industry'][0]['industry 1'][1]),
        percentage: Number(candidate['by industry'][0]['industry 1'][2]),
      },
      {
        colorCode: '#00903d',
        industry: candidate['by industry'][0]['industry 2'][0],
        amount: Number(candidate['by industry'][0]['industry 2'][1]),
        percentage: Number(candidate['by industry'][0]['industry 2'][2]),
      },
      {
        colorCode: '#00af4a',
        industry: candidate['by industry'][0]['industry 3'][0],
        amount: Number(candidate['by industry'][0]['industry 3'][1]),
        percentage: Number(candidate['by industry'][0]['industry 3'][2]),
      },
      {
        colorCode: '#00d359',
        industry: candidate['by industry'][0]['industry 4'][0],
        amount: Number(candidate['by industry'][0]['industry 4'][1]),
        percentage: Number(candidate['by industry'][0]['industry 4'][2]),
      },
      {
        colorCode: '#00fc6a',
        industry: candidate['by industry'][0]['industry 5'][0],
        amount: Number(candidate['by industry'][0]['industry 5'][1]),
        percentage: Number(candidate['by industry'][0]['industry 5'][2]),
      },
    ];

    this.dataSource.data = topFiveIndustries;
  }

}
