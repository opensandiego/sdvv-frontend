import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-expanded-raised-in-vs-out',
  templateUrl: './expanded-raised-in-vs-out.component.html',
  styleUrls: ['./expanded-raised-in-vs-out.component.scss']
})
export class ExpandedRaisedInVsOutComponent implements OnChanges {
  @Input() inside: number;
  @Input() outside: number;
  @Input() areaName: string; // Example: City of San Diego
  @Input() jurisdiction: string; // Example: City, District
  @Input() jurisdictionSuffix?: string; // Example '1', '5'

  title: string;
  tooltipText: string;
  jurisdictionComplete: string;

  constructor() { }

  ngOnChanges(): void {
    this.setData();
  }

  setData() {
    this.jurisdictionComplete = this.jurisdiction;
    this.jurisdictionComplete += (this.jurisdictionSuffix) ? ` ${this.jurisdictionSuffix}` : '';
    
    this.title = `In vs. Out of ${this.jurisdictionComplete}`;
    this.tooltipText = `Total campaign funds raised in the ${this.areaName} versus funds raised outside of city limits.`;
  }

}
