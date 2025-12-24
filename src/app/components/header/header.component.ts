import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUniversity, faBalanceScale, faMapMarkedAlt, faQuestion, faBars, faChevronRight } from '@fortawesome/free-solid-svg-icons';

import { SideMenuService } from 'src/app/public/services/side-menu.service';

@Component({
    imports: [
        FontAwesomeModule,
        MatToolbarModule,
        RouterModule,
    ],
    selector: 'header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  homeLink = '/home';

  vvLogoURL = '../../../assets/home/VV_Logo_Reversed@2x.png';
  vvAltText = `Voter's Voice Initiative`;
  
  public logoURL = this.vvLogoURL;
  public logoAltText = this.vvAltText;

  constructor(
    public sideMenuService: SideMenuService,
    library: FaIconLibrary,
  ) {
    library.addIcons(faUniversity, faBalanceScale, faMapMarkedAlt, faQuestion, faBars, faChevronRight);
  }

  resetSidenav() {
  }

  sideNavToggle() {
    this.sideMenuService.toggleSideMenu();
  }

}
