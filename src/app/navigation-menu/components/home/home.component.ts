import { Component, HostListener, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { SideMenuService } from 'src/app/navigation-menu/services/side-menu.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  @ViewChild('drawer', { static: true }) sidenav: MatDrawer;
  isOpened: boolean = true;

  constructor(
    public sideMenuService: SideMenuService,
  ) { }
  
  @HostListener('window:load', ['$event'])
  onLoad(event): void {
    this.setMenu(event.currentTarget.innerWidth);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event): void {
    this.setMenu(event.target.innerWidth);
  }

  setMenu(pageWidth: number) {
    if (this.sidenav !== undefined && pageWidth) {
      if (pageWidth <= 1200) {
        this.sideMenuService.closeSideMenu();
        this.sidenav.mode = 'over';
      } else {
        this.sideMenuService.openSideMenu();
        this.sidenav.mode = 'side';
      }
    }
  }

  ngOnInit(): void {
    this.sideMenuService.sideMenuOpened$
      .subscribe(isOpened => this.isOpened = isOpened);
  }

}
