import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { AccordionModule } from 'primeng/accordion';

import { OutsideMoneyStackedBarComponentV2 } from 'projects/lib-ui-charts/src/lib/outside-money-stacked-bar-v2/outside-money-stacked-bar.component';
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
    imports: [
        CommonModule,
        FontAwesomeModule,
        AccordionModule,
        OutsideMoneyStackedBarComponentV2,
        TopCategoriesTableComponent,
    ],
    selector: 'independent-expenditures-v2',
    templateUrl: './independent-expenditures-v2.component.html',
    styleUrls: ['./independent-expenditures-v2.component.scss']
})
export class IndependentExpendituresV2Component implements OnChanges {
  @Input() oppositionCommittees: IndependentCommittees[];
  @Input() supportCommittees: IndependentCommittees[];
  
  hoveredCommittee: string = null;
  oppositionColor = globals.expendituresInOppositionColor;
  supportColor = globals.expendituresInSupportColor;

  activeAccordionTitle = 'See Independent Expenditure Committees';
  inactiveAccordionTitle = 'No Independent Expenditures by Outside Committees found';
  accordionTitle = '';
  committeesFound = false;
  tabSelected = false;

  opposeCount = 0;
  supportCount = 0;

  oppositionExpenditures = {
    title: 'Expenditures in Opposition',
    categories: [],
  };

  supportExpenditures = {
    title: 'Expenditures in Support',
    categories: [],
  };
  
  faCircle = faCircle;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['oppositionCommittees']) {
      const committees = changes['oppositionCommittees'].currentValue;
      this.opposeCount = committees ? committees.length : 0;
    }
    
    if (changes['supportCommittees']) {
      const committees = changes['supportCommittees'].currentValue;
      this.supportCount = committees ? committees.length : 0;
    }

    if (this.opposeCount + this.supportCount > 0) {
      this.accordionTitle = this.activeAccordionTitle;
      this.committeesFound = true;
    } else {
      this.accordionTitle = this.inactiveAccordionTitle;
      this.committeesFound = false;
      this.tabSelected = false; // this needs to be set to false when the candidate is changed to one with no committees 
    }
  }

  committeeHoveredOver(committee){
    this.hoveredCommittee = committee;
  }
  
}
