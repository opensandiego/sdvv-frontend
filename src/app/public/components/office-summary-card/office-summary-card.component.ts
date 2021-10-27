import { Component, Input, OnInit } from '@angular/core';
import { SidenavService } from 'src/app/shared/services/sidenav.service';
import { OfficeSummaryWithRoute } from '../../interfaces/office-summary-with-route';

@Component({
  selector: 'office-summary-card',
  templateUrl: './office-summary-card.component.html',
  styleUrls: ['./office-summary-card.component.scss']
})
export class OfficeSummaryCardComponent implements OnInit {
  @Input() summary: OfficeSummaryWithRoute;

/**
 * The icons used below must be imported in the module and
 * injected in the module's constructor. The imported icon 
 * names are similar but not exactly the same as those
 * used in library.addIcons().
 */   
  private officeIconsMap = {
    'mayor': 'university',
    'city attorney': 'balance-scale',
    'city council': 'map-marked-alt',
    'default': 'question',
  }

  constructor(
    private sidenavService: SidenavService,
  ) { }

  ngOnInit(): void {
  }

  getIcon(office?: string) {
    const icon = this.officeIconsMap[office.toLowerCase()];
    return icon ? icon : this.officeIconsMap['default'];
  }

  selectOffice(officeType: string) {
    this.sidenavService.emitCandidateTypeSplash(officeType);
  }
}
