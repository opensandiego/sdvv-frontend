import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'average-donation',
  templateUrl: './average-donation.component.html',
  styleUrls: ['./average-donation.component.scss']
})
export class AverageDonationComponent implements OnInit {
  @Input() average: number = 0;
  title = 'Average Donation';

  constructor() { }

  ngOnInit(): void {
  }

}
