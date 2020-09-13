import { Component, HostListener, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  isExpanded: boolean = false;
  showSubmenu: boolean = false;
  panelOpenState: boolean = false;

  @ViewChild('drawer') sidenav: MatDrawer;

  constructor() { }

  @HostListener('window:resize', ['$event'])
  onResize(event): void {
      if (this.sidenav !== undefined) {
          if (event.target.innerWidth <= 1000) {
              this.sidenav.close();
          } else {
              this.sidenav.open();
          }
      }
  }

  ngOnInit() {
  }

}
