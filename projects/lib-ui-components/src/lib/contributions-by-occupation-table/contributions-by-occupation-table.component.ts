import { CommonModule } from '@angular/common';
import { Component, effect, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';

export interface ContributionGroup {
  name: string;
  amount: number;
  percent: number;
}

@Component({
  selector: 'contributions-by-occupation-table',
  imports: [CommonModule, MatIconModule, MatTableModule, FontAwesomeModule],
  templateUrl: './contributions-by-occupation-table.component.html',
  styleUrls: ['./contributions-by-occupation-table.component.scss'],
})
export class ContributionsByOccupationTableComponent {
  contributionGroups = input<ContributionGroup[]>([]);
  contributionColorShades = input<string[]>([]);

  faCircle = faCircle;

  dataSource = new MatTableDataSource();
  displayedColumns: string[] = [
    'colorCode',
    'industry',
    'amount',
    'percentage',
  ];

  constructor() {
    effect(() => {
      const contributionGroups =
        this.contributionGroups()?.length > 0 ? this.contributionGroups() : [];
      this.setTableData(contributionGroups);
    });
  }

  setTableData(groups: ContributionGroup[]) {
    const tableData = this.getTableData(groups);
    this.dataSource.data = tableData;
  }

  getTableData(groups: ContributionGroup[]) {
    const colorCodes = this.contributionColorShades();

    return groups.map((group, index) => ({
      colorCode: colorCodes?.[index] ? colorCodes[index] : 'black',
      industry: group['name'],
      amount: group['amount'],
      percentage: group['percent'],
    }));
  }
}
