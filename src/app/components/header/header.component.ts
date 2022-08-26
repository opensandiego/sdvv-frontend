import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SideMenuService } from 'src/app/public/services/side-menu.service';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';

import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUniversity, faBalanceScale, faMapMarkedAlt, faQuestion, faBars, faChevronRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  standalone: true,
  imports: [
    FontAwesomeModule,
    MatToolbarModule,
    MatIconModule,
    RouterModule,
  ],
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {

  homeLink = '/home';
  public title = 'San Diego City - Campaign Finance Dashboard';

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
