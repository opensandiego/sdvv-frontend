import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SideMenuService {
  private sideMenuStatus: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public sideMenuOpened$ = this.sideMenuStatus.asObservable()

  constructor( ) { }

  openSideMenu() {
    this.sideMenuStatus.next(true);
  }

  closeSideMenu() {
    this.sideMenuStatus.next(false);
  }

  toggleSideMenu() {
    this.sideMenuStatus.next(!this.sideMenuStatus.value);
  }
}

