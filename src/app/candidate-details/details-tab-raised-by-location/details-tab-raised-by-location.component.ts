import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CandidateDetailsService } from 'src/app/store/services/candidate.details.service';

@Component({
  selector: 'app-details-tab-raised-by-location',
  templateUrl: './details-tab-raised-by-location.component.html',
  styleUrls: ['./details-tab-raised-by-location.component.scss']
})
export class DetailsTabRaisedByLocationComponent implements OnInit {

  raisedByLocations;

  title = {
    top: 'Amount Raised',
    bottom: 'By Location',
    tooltipText: 'Placeholder tooltip text for Amount Raised by Location!',
  };

  constructor(
    private candidateDetailsService: CandidateDetailsService,
    private route: ActivatedRoute,
  ) { }


  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const candidateId = params.get('id');

      this.candidateDetailsService.getRaisedByLocation(candidateId)
        .subscribe( response => {
          this.raisedByLocations = {
            inDistrict: this.getAmount('In District', response.locations),
            inCity: this.getAmount('In City', response.locations),
            inCounty: this.getAmount('In County', response.locations),
            inState: this.getAmount('In State', response.locations),
            outState: this.getAmount('Out of State', response.locations),
          }
        })
    });
  }

  getAmount(location: string, locations: any[]) {
    const foundLocation = locations.find(locationItem => locationItem.name === location);
    return foundLocation 
      ? parseInt(foundLocation.amount)
      : 0;
  }

}
