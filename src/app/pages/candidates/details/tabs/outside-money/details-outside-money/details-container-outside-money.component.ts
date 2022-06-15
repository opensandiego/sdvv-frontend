import { Component, Input } from '@angular/core';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
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
  templateUrl: './details-container-outside-money.component.html',
  styleUrls: ['./details-container-outside-money.component.scss']
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

  committeeHoveredOver(committee){
    this.hoveredCommittee = committee;
  }
  
}
