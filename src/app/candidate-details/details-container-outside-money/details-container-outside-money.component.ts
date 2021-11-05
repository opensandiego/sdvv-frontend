import { Component, Input, OnChanges, } from '@angular/core';

import { faCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-details-container-outside-money',
  templateUrl: './details-container-outside-money.component.html',
  styleUrls: ['./details-container-outside-money.component.scss']
})
export class DetailsContainerOutsideMoneyComponent implements OnChanges {
  @Input() oppositionExpendituresCategories;
  @Input() supportExpendituresCategories;

  hoveredCommittee: string = null;
  oppositionCommittees;
  supportCommittees;

  oppositionColor = '#6964AD';
  supportColor = '#3392FF';

  oppositionExpenditures = {
    title: 'Expenditures in Opposition',
    categories: [],
  };

  supportExpenditures = {
    title: 'Expenditures in Support',
    categories: [],
  };
  
  faCircle = faCircle;

  constructor() { }

  ngOnChanges(): void {
    this.oppositionCommittees = 
      this.oppositionExpendituresCategories.map( committee => ({
        ...committee,
        color: this.oppositionColor,
      }));

    this.supportCommittees = 
      this.supportExpendituresCategories.map( committee => ({
        ...committee,
        color: this.supportColor,
      }));

  }

  committeeHoveredOver(committee){
    this.hoveredCommittee = committee;
  }
  
}
