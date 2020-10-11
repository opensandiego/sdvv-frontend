import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {
  emitChangeSidenav = new Subject<any>();
  changeEmittedFromSidenav$ = this.emitChangeSidenav.asObservable();

  constructor() { }

  emitChangeFromSidenav(change: string) {
    this.emitChangeSidenav.next(change);
  }
}
