import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-expanded-average-donation',
  templateUrl: './expanded-average-donation.component.html',
  styleUrls: ['./expanded-average-donation.component.scss']
})
export class ExpandedAverageDonationComponent implements OnInit {
  @Input() amount: number = 0;
  title = 'Average Donation';

  constructor() { }

  ngOnInit(): void {
  }

}
