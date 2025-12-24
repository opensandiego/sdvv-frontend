import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'average-donation',
  imports: [CommonModule],
  template: `<div class="average-donation">
    <div class="title">{{ title }}</div>
    <div class="amount">
      {{ average | currency : 'USD' : 'symbol' : '1.0-0' }}
    </div>
  </div> `,
  styleUrls: ['./average-donation.component.scss'],
})
export class AverageDonationComponent {
  @Input() average: number = 0;
  title = 'Average Donation';
}
