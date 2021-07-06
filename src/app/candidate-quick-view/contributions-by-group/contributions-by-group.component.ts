import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-contributions-by-group',
  templateUrl: './contributions-by-group.component.html',
  styleUrls: ['./contributions-by-group.component.scss']
})
export class ContributionsByGroupComponent implements OnInit {
  @Input() contributionGroups;

  title = 'Donations by Group';
  tooltipText = "Total contributions from the five largest groups of campaign donors.  Groups are determined by the industry segment of each donor\'s employer.";

  constructor() { }

  ngOnInit(): void {
  }

}
