import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-expanded-raised-vs-spent',
  templateUrl: './expanded-raised-vs-spent.component.html',
  styleUrls: ['./expanded-raised-vs-spent.component.scss']
})
export class ExpandedRaisedVsSpentComponent implements OnInit {

  @Input() raised: number;
  @Input() spent: number;
  
  @Input() averageDonation: number;

  title = 'Raised v. Spent';
  tooltipText = 'Total campaign funds raised and spent by the candidate.';

  constructor() { }

  ngOnInit(): void {
  }

}
