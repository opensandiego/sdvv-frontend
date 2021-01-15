import { Component, OnInit } from '@angular/core';
import { SidenavService } from '../../services';
import { CandidateService } from '../../services/candidate.service';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss']
})
export class SplashComponent implements OnInit {

  constructor(
    private sidenavService: SidenavService,
    private candidateService: CandidateService
  ) { }

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

  selectOffice(officeType: string) {
    this.sidenavService.emitCandidateTypeSplash(officeType);
  }

}
