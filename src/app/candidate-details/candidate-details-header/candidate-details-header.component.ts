import { Component, Input, OnChanges } from '@angular/core';
import { faLink } from '@fortawesome/free-solid-svg-icons';

import { getCompactFormattedCurrency,  } from '../../shared/number-formatter'
@Component({
  selector: 'app-candidate-details-header',
  templateUrl: './candidate-details-header.component.html',
  styleUrls: ['./candidate-details-header.component.scss']
})
export class CandidateDetailsHeaderComponent implements OnChanges {

  @Input() imageUrl: string;
  @Input() candidateName: string;
  @Input() description: string;
  @Input() website: string;
  @Input() raised: number;
  @Input() donors: number;
  @Input() averageDonation: number;

  public raisedAmount: string;
  public donorsCount: string;
  public averageDonationAmount: string;
  faLink = faLink;

  constructor( ) { }

  ngOnChanges(): void {
    this.raisedAmount = getCompactFormattedCurrency(this.raised);
    
    this.donorsCount = this.donors.toLocaleString();

    this.averageDonationAmount = getCompactFormattedCurrency(this.averageDonation);
  }

}
