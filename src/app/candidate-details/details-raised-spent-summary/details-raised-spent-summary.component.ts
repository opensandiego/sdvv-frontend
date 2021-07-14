import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-details-raised-spent-summary',
  templateUrl: './details-raised-spent-summary.component.html',
  styleUrls: ['./details-raised-spent-summary.component.scss']
})
export class DetailsRaisedSpentSummaryComponent implements OnChanges {
  @Input() raised: number;
  @Input() spent: number;

  constructor() { }

  ngOnChanges(): void {
  }

  formatNumber(amount: number): string {
    return amount.toLocaleString('en', { style: 'currency', currency: 'USD', maximumFractionDigits: 0});
  }

}
