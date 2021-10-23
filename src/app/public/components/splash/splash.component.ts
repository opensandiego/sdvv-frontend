import { Component, OnInit } from '@angular/core';

import { 
  faUniversity, faBalanceScale, faMapMarkedAlt 
} from '@fortawesome/free-solid-svg-icons';
import { SidenavService } from 'src/app/services';
import { OfficeSummary } from 'src/app/store/interfaces/office.summary';
import { OfficeSummaryService } from 'src/app/store/services/office-summary.service';
import { OfficeSummaryWithRoute } from '../../interfaces/office-summary-with-route';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss']
})
export class SplashComponent implements OnInit {
  faUniversity = faUniversity;
  faBalanceScale = faBalanceScale;
  faMapMarkedAlt = faMapMarkedAlt;

  constructor(
    private sidenavService: SidenavService,
    private officeSummaryService: OfficeSummaryService,
  ) { }

  year = '2020';
  summaries: OfficeSummary[];
  summariesWithRoute: OfficeSummaryWithRoute[];

  ngOnInit() {
    this.officeSummaryService.getSummary(this.year)
      .subscribe(summary => this.summariesWithRoute = summary.map(summary => ({
        ...summary,
        routeLink: this.getRoute(summary.office),
      })));
  }
 
  getRoute(office: string) {
    return 'office/' + office.toLowerCase().split(' ').join('-');
  }

  selectOffice(officeType: string) {
    this.sidenavService.emitCandidateTypeSplash(officeType);
  }

}
