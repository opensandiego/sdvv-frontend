import { Component, OnInit } from '@angular/core';
import { SideMenuService } from 'src/app/navigation-menu/services/side-menu.service';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  constructor(
    public sideMenuService: SideMenuService,
  ) { }

  ngOnInit(): void {
  }

  resetSidenav() {
  }

  sideNavToggle() {
    this.sideMenuService.toggleSideMenu();
  }

}
