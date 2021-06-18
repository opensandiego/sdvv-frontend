import { Component, Input, OnChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-donations-by-group',
  templateUrl: './donations-by-group.component.html',
  styleUrls: ['./donations-by-group.component.scss']
})
export class DonationsByGroupComponent implements OnChanges {

  @Input() donationGroups: object[];

  dataSource = new MatTableDataSource();
  displayedColumns: any[];

  constructor() { }

  ngOnChanges(): void {
    this.setDisplayedColumns();
    this.setTableData(this.donationGroups);
  }

  setDisplayedColumns() {
    this.displayedColumns = [
      'colorCode',
      'industry',
      'amount',
      'percentage',
    ];
  }

  setTableData(groups: object[]) {
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
