import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ContributionsGroupedByLocation, ContributionsGroupedByLocationGQL } from './details-contributions-by-location-gql.query';

@Component({
    selector: 'details-contributions-by-location',
    templateUrl: './details-contributions-by-location-gql.component.html',
    styleUrls: ['./details-contributions-by-location-gql.component.scss'],
    standalone: false
})
export class DetailsContributionsByLocationComponent implements OnChanges {
  @Input() candidateId;

  raisedByLocations;

  constructor(private contributionsGroupedByLocationGQL: ContributionsGroupedByLocationGQL) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['candidateId']) {
      const candidateId = changes['candidateId'].currentValue;
      this.update(candidateId); 
    }
  }
  
  update(candidateId: string) {
    this.candidateId = candidateId;

    if (!this.candidateId) { return; }

    this.contributionsGroupedByLocationGQL.watch({
      candidateId: this.candidateId,
    }, {
      // errorPolicy: 'all',
    }).valueChanges.subscribe( (result: any) => {
      const response: ContributionsGroupedByLocation = result.data;
      const location = response?.candidate?.committee?.contributions?.categorizedBy?.location;

      if (!location) return;

      this.raisedByLocations = {
        inDistrict: location.inDistrict ? location.inDistrict : 0,
        inCity: location.inCity ? location.inCity : 0,
        inCounty: location.inCounty ? location.inCounty : 0,
        inState: location.inState ? location.inState : 0,
        outState: location.outOfState ? location.outOfState : 0,
      }
    });
  }
}
