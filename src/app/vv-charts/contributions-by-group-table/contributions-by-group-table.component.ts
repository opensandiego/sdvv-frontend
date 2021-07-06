import { Component, Input, OnChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { faCircle } from '@fortawesome/free-solid-svg-icons';

export interface ContributionGroup {
  name: string;
  amount: number;
  percent: number;
}

@Component({
  selector: 'app-contributions-by-group-table',
  templateUrl: './contributions-by-group-table.component.html',
  styleUrls: ['./contributions-by-group-table.component.scss']
})
export class ContributionsByGroupTableComponent implements OnChanges {

  @Input() contributionGroups: ContributionGroup[];

  dataSource = new MatTableDataSource();
  displayedColumns: any[];
  faCircle = faCircle;

  constructor() { }

  ngOnChanges(): void {
    this.setDisplayedColumns();
    this.setTableData(this.contributionGroups);
  }

  setDisplayedColumns() {
    this.displayedColumns = [
      'colorCode',
      'industry',
      'amount',
      'percentage',
    ];
  }

  setTableData(groups: ContributionGroup[]) {
    const colorCodes = [ '#007431', '#00903d', '#00af4a', '#00d359', '#00fc6a' ];

    const topFiveIndustries = groups.map((group, index) =>
      ({
        colorCode: colorCodes[index],
        industry: group['name'],
        amount: group['amount'],
        percentage: group['percent'],
      })
    );

    this.dataSource.data = topFiveIndustries;
  }

}
