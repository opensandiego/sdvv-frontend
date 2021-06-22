import { Component, Input, OnChanges } from '@angular/core';
import { faLink } from '@fortawesome/free-solid-svg-icons';

import { RoundCurrencyPipe } from '../../vv-charts/round-currency.pipe';

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

  constructor(
    private roundCurrencyPipe: RoundCurrencyPipe
  ) { }

  ngOnChanges(): void {
    const decimalPlacesToRoundTo = 0;
    const decimalPrefixThreshold = 10000;

    this.raisedAmount = this.roundCurrencyPipe
      .transform(this.raised, decimalPlacesToRoundTo, decimalPrefixThreshold);
    
    this.donorsCount = this.roundCurrencyPipe
      .transform(this.donors, decimalPlacesToRoundTo, decimalPrefixThreshold);

    this.averageDonationAmount = this.roundCurrencyPipe
      .transform(this.averageDonation, decimalPlacesToRoundTo, decimalPrefixThreshold);
  }

}
