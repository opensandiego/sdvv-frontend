import { Component, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CandidateDetailsService } from 'src/app/store/services/candidate.details.service';

@Component({
  selector: 'app-details-raised-spent-summary',
  templateUrl: './details-raised-spent-summary.component.html',
  styleUrls: ['./details-raised-spent-summary.component.scss']
})
export class DetailsRaisedSpentSummaryComponent implements OnChanges, OnInit {
  raised: number;
  spent: number;

  constructor(
    private candidateDetailsService: CandidateDetailsService,
    private route: ActivatedRoute,
  ) { }
  
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const candidateId = params.get('id');

      this.candidateDetailsService.getRaisedSpent(candidateId)
        .subscribe( response => {
          this.raised = parseInt(response.summary.totalRaised);
          this.spent = parseInt(response.summary.totalSpent);
        })
    });
  }

  ngOnChanges(): void {
  }

  formatNumber(amount: number): string {
    return amount.toLocaleString('en', { style: 'currency', currency: 'USD', maximumFractionDigits: 0});
  }

}
