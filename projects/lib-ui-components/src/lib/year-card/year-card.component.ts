import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'year-card',
  imports: [RouterModule],
  templateUrl: './year-card.component.html',
  styleUrls: ['./year-card.component.scss'],
})
export class YearCardComponent implements OnChanges {
  @Input() year: string;
  @Input() mayorCandidateCount: number;
  @Input() cityCouncilCandidateCount: number;
  @Input() cityAttorneyCandidateCount: number;

  buttonText: string = 'See Election Year';
  link: string = '';

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['year']) {
      const year = changes['year'].currentValue;
      this.link = year ? `/year/${year}` : null;
    }
  }
}
