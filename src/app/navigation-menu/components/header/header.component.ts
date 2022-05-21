import { Component } from '@angular/core';
import { SideMenuService } from 'src/app/navigation-menu/services/side-menu.service';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {

  homeLink = '/home';

  constructor(
    public sideMenuService: SideMenuService,
  ) { }

  resetSidenav() {
  }

  sideNavToggle() {
    this.sideMenuService.toggleSideMenu();
  }

}
