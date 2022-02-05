import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { faSortAmountUp, faSortAmountDownAlt} from '@fortawesome/free-solid-svg-icons';
import { CandidateDetailsService } from 'src/app/store/services/candidate.details.service';

import { RaisedByIndustry } from '../../vv-charts/raised-by-industry-bar/raised-by-industry-bar.component';

export enum SortOrder {
  High =  1,
  Low  = -1,
}

@Component({
  selector: 'app-details-raised-by-industry',
  templateUrl: './details-raised-by-industry.component.html',
  styleUrls: ['./details-raised-by-industry.component.scss']
})
export class DetailsRaisedByIndustryComponent implements OnInit {

  raisedByIndustries: RaisedByIndustry[];
  
  sortOrder: SortOrder = SortOrder.High;
  SortOrderType = SortOrder;

  sortButtons = [{
      text: 'HIGH',
      order: SortOrder.High,
      icon: faSortAmountUp,
    }, {
      text: 'LOW',
      order: SortOrder.Low,
      icon: faSortAmountDownAlt,
    },
  ];

  constructor(
    private candidateDetailsService: CandidateDetailsService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const candidateId = params.get('candidateId');

      this.candidateDetailsService.getRaisedByIndustry(candidateId)
        .subscribe( response => {
          this.raisedByIndustries = response.occupations.map(occupation =>
            ({
              name: occupation.name,
              value: parseInt(occupation.amount),
            }));
            this.doSort();
        })
    });
  }

  doSort() {
    this.raisedByIndustries = this.raisedByIndustries
      .sort((a, b) => (a.value - b.value) * this.sortOrder);

    this.raisedByIndustries = [...this.raisedByIndustries];
  }

  onSort(order: SortOrder) {
    this.sortOrder = order;
    this.doSort();
  }

}
