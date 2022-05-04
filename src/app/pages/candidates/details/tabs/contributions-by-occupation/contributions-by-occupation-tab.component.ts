import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'contributions-by-occupation-tab',
  templateUrl: './contributions-by-occupation-tab.component.html',
  styleUrls: ['./contributions-by-occupation-tab.component.scss']
})
export class ContributionsByOccupationTabComponent {
  @Input() candidateId: string;

  title = {
    top: 'Amount Raised',
    bottom: 'By Occupation',
    tooltipText: 'Placeholder tooltip text for Amount Raised by Occupation!',
  };
}
