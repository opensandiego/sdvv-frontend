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
    return 'office/' + office.office.toLowerCase().split(' ').join('-') + '/0';
  }
}
