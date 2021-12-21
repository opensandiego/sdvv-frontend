import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { 
  faUniversity, faBalanceScale, faMapMarkedAlt 
} from '@fortawesome/free-solid-svg-icons';
import { OfficeSummaryWithRoute } from '../../interfaces/office-summary-with-route';

@Component({
  selector: 'office-summary',
  templateUrl: './office-summary.component.html',
  styleUrls: ['./office-summary.component.scss']
})
export class OfficeSummaryComponent implements OnInit {
  faUniversity = faUniversity;
  faBalanceScale = faBalanceScale;
  faMapMarkedAlt = faMapMarkedAlt;

  summariesWithRoute: OfficeSummaryWithRoute[];

  constructor(
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {  
    this.activatedRoute.paramMap.subscribe(params => {
      const officeSummaries = this.activatedRoute.snapshot.data.office;

      this.summariesWithRoute = officeSummaries.map(summary => ({
        ...summary,
        routeLink: this.getRoute(summary),
      }))
    })
  }

  getRoute(office) {
    let pathSuffix = '/0';

    // Check to see if the first City Council district should be 1 or 2.
    // For the years 2016 and 2020 the first district will be 1
    // For the years 2018 and 2022 the first district will be 2
    // This check should not be needed after the City Council map component is completed.
    if (office.office.toLowerCase() == 'City Council'.toLowerCase()) {
      if (!Number.isNaN(office.year)) {
        pathSuffix = office.year % 4 === 0 ? '/1' : '/2'
      }
    }

    return 'office/' + office.office.toLowerCase().split(' ').join('-') + pathSuffix;
  }
}
