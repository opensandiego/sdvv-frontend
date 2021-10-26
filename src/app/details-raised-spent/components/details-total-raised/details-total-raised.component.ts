import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { CandidateDetailsService } from 'src/app/store/services/candidate.details.service';

@Component({
  selector: 'app-details-total-raised',
  templateUrl: './details-total-raised.component.html',
  styleUrls: ['./details-total-raised.component.scss']
})
export class DetailsTotalRaisedComponent implements OnInit {
  tooltipText = 'Placeholder tooltip text.';
  colors = ['#00e25f', '#00b24b', '#007e35'];

  totalRaised: number;
  totalRaisedFormatted: string;
  raisedCategories: any[];

  faQuestionCircle = faQuestionCircle;
  
  constructor(
    private candidateDetailsService: CandidateDetailsService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const candidateId = params.get('id');

      this.candidateDetailsService.getRaisedSpent(candidateId)
        .subscribe( response => {
          this.totalRaised = parseInt(response.summary.totalRaised);
          this.totalRaisedFormatted = this.totalRaised
            .toLocaleString('en', { style: 'currency', currency: 'USD', maximumFractionDigits: 0});

        this.raisedCategories = response.raisedGroups.map((group, i) => ({
            name: group.name,
            value: parseInt(group.amount),
            color: i < this.colors.length ? this.colors[i] : 'red',
          }))
        })
    });
  }

}
