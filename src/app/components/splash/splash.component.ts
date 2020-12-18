import { Component, OnInit } from '@angular/core';
import { CandidateService } from '../../services/candidate.service';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss']
})
export class SplashComponent implements OnInit {

  constructor(private candidateService: CandidateService) { }

  campaignTotals = {
    mayor: '0',
    cityAttorney: '0',
    cityCouncil: '0'
  }

  candidateCounts = {
    mayor: '0',
    cityAttorney: '0',
    cityCouncil: '0'
  }

  ngOnInit() {

    this.candidateService.getCampaignTotals()
      .subscribe(totals => this.campaignTotals = totals);

    this.candidateService.getNumberOfCandidates()
      .subscribe(counts => this.candidateCounts = counts);

  }

}
