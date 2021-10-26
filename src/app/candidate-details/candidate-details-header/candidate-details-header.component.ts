import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import { CandidateDetailsService } from 'src/app/store/services/candidate.details.service';

import { getCompactFormattedCurrency,  } from '../../shared/number-formatter'
@Component({
  selector: 'app-candidate-details-header',
  templateUrl: './candidate-details-header.component.html',
  styleUrls: ['./candidate-details-header.component.scss']
})
export class CandidateDetailsHeaderComponent implements OnInit {
  imageUrl: string;
  candidateName: string;
  description: string;
  website: string;
  raised: number;
  donors: number;
  averageDonation: number;

  private defaultImagePath = 'assets/candidate-card/profile.png';

  public raisedAmount: string;
  public donorsCount: string;
  public averageDonationAmount: string;
  faLink = faLink;

  constructor(
    private candidateDetailsService: CandidateDetailsService,
    private route: ActivatedRoute,
   ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const candidateId = params.get('id');

      this.candidateDetailsService.getHeader(candidateId)
        .subscribe( header => {
          this.imageUrl = header.imageUrl 
            ? header.imageUrl
            : this.defaultImagePath;
          this.candidateName = header.candidateName;
          this.description = header.description;
          this.website = header.website;
          this.raised = parseInt(header.raised);
          this.donors = parseInt(header.donors);
          this.averageDonation = parseInt(header.averageDonation);
  
          this.raisedAmount = getCompactFormattedCurrency(this.raised);
          this.donorsCount = this.donors.toLocaleString();
          this.averageDonationAmount = getCompactFormattedCurrency(this.averageDonation);
        })
    });

  }
}
