import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faSortAmountUp,
  faSortAmountDownAlt,
} from '@fortawesome/free-solid-svg-icons';

export enum SortOrder {
  High = 1,
  Low = -1,
}

@Component({
  selector: 'details-contributions-by-occupation-header',
  imports: [CommonModule, MatButtonModule, FontAwesomeModule],
  templateUrl: './details-contributions-by-occupation-header.component.html',
  styleUrls: ['./details-contributions-by-occupation-header.component.scss'],
})
export class DetailsContributionsByOccupationHeaderComponent {
  @Output() sortOrderChanged: EventEmitter<SortOrder> =
    new EventEmitter<SortOrder>();

  sortOrder: SortOrder = SortOrder.High;
  SortOrderType = SortOrder;

  sortButtons = [
    {
      text: 'HIGH',
      order: SortOrder.High,
      icon: faSortAmountUp,
    },
    {
      text: 'LOW',
      order: SortOrder.Low,
      icon: faSortAmountDownAlt,
    },
  ];

  onSort(order: SortOrder) {
    this.sortOrder = order;
    this.sortOrderChanged.emit(order);
  }
}
