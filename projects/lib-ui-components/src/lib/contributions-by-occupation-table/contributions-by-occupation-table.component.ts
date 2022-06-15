import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

export interface ContributionGroup {
  name: string;
  amount: number;
  percent: number;
}

@Component({
  selector: 'contributions-by-occupation-table',
  templateUrl: './contributions-by-occupation-table.component.html',
  styleUrls: ['./contributions-by-occupation-table.component.scss']
})
export class ContributionsByOccupationTableComponent implements OnChanges {

  @Input() contributionGroups: ContributionGroup[] = [];
  @Input() contributionColorShades?: string[];

  dataSource = new MatTableDataSource();
  displayedColumns: string[] = [
    'colorCode',
    'industry',
    'amount',
    'percentage',
  ];;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    
    if (changes['contributionGroups']) {
      const contributionGroups = changes['contributionGroups'].currentValue;
      
      if (contributionGroups?.length > 0) {
        this.setTableData(contributionGroups);
      } else {
        this.setTableData([]);
      }
    }

  }

  setTableData(groups: ContributionGroup[]) {
    const colorCodes = this.contributionColorShades;

    const topFiveIndustries = groups.map((group, index) =>
      ({
        colorCode: colorCodes?.[index] ? colorCodes[index] : 'black',
        industry: group['name'],
        amount: group['amount'],
        percentage: group['percent'],
      })
    );

    this.dataSource.data = topFiveIndustries;
  }

}
