import { Component, OnInit, } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { CandidateDetailsService } from 'src/app/store/services/candidate.details.service';

@Component({
  selector: 'app-details-container-outside-money',
  templateUrl: './details-container-outside-money.component.html',
  styleUrls: ['./details-container-outside-money.component.scss']
})
export class DetailsContainerOutsideMoneyComponent implements OnInit {
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

  constructor(
    private candidateDetailsService: CandidateDetailsService,
    private route: ActivatedRoute,
  ) { }

  
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const candidateId = params.get('id');

      this.candidateDetailsService.getOutsideMoney(candidateId)
        .subscribe( response => {

          this.supportCommittees = response.supportGroups.map((group, i) => ({
            id: 'S' + i.toString(),
            name: group.committee ? group.committee : 'null',
            value: parseInt(group.sum),
            percent: parseFloat(group.average),
            color: this.supportColor,
          }))

          this.oppositionCommittees = response.oppositionGroups.map((group, i) => ({
            id: 'O' + i.toString(),
            name: group.committee ? group.committee : 'null',
            value: parseInt(group.sum),
            percent: parseFloat(group.average),
            color: this.oppositionColor,
          }))

        })
    });
  }

  committeeHoveredOver(committee){
    this.hoveredCommittee = committee;
  }
  
}
