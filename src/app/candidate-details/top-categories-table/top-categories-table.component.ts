import { Component, Input, OnChanges, Output, EventEmitter} from '@angular/core';

import { getCompactFormattedCurrency } from '../../shared/number-formatter'

export interface Category {
  id: string;
  name: string;
  value: number;
  percent: number;
  color: string;
}

@Component({
  selector: 'app-top-categories-table',
  templateUrl: './top-categories-table.component.html',
  styleUrls: ['./top-categories-table.component.scss']
})
export class TopCategoriesTableComponent implements OnChanges {

  @Input() categories: Category[];
  @Input() categoryHighlighted: string;
  @Output() categoryHighlightedChange = new EventEmitter<string>();
  
  @Input() useHSLColors?: boolean = false;
  
  dataSource;
  displayedColumns: string[] = ['name', 'value', 'percent'];

  constructor() { }

  ngOnChanges(): void {
    let categories = this.categories;

    this.setTabletData(categories);
  }

  setTabletData(tableData: object[]): void {

    this.dataSource = tableData.map( (row) => ({
        ...row,
        value: getCompactFormattedCurrency(row['value']),
        boxShadowStyle: `10px 0px 0px 0px ${row['color']} inset`,
        percent: (row['percent']/100)
          .toLocaleString("en", { style: "percent", minimumFractionDigits: 1 }),
      })
    );

  }

  hoveredRow(row: object) {  
    this.categoryHighlightedChange.emit(row['id']);
  }

}
