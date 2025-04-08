import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { OutsideMoneyStackedBarComponent } from 'lib-ui-charts';
import { TopCategoriesTableComponent } from 'src/app/components/top-categories-table/top-categories-table.component';
import { globals } from 'src/app/globals';

export interface IndependentCommittees {
  id: string;
  name: string;
  value: number;
  percent: number;
  color: string;
}

@Component({
  selector: 'details-outside-money',
  imports: [
    CommonModule,
    FontAwesomeModule,
    OutsideMoneyStackedBarComponent,
    TopCategoriesTableComponent,
  ],
  templateUrl: './details-container-outside-money.component.html',
  styleUrls: ['./details-container-outside-money.component.scss'],
})
export class DetailsContainerOutsideMoneyComponent {
  @Input() oppositionCommittees: IndependentCommittees[];
  @Input() supportCommittees: IndependentCommittees[];

  hoveredCommittee: string = null;
  oppositionColor = globals.expendituresInOppositionColor;
  supportColor = globals.expendituresInSupportColor;

  oppositionExpenditures = {
    title: 'Expenditures in Opposition',
    categories: [],
  };

  supportExpenditures = {
    title: 'Expenditures in Support',
    categories: [],
  };

  faCircle = faCircle;

  committeeHoveredOver(committee) {
    this.hoveredCommittee = committee;
  }
}
