import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {
  emitCandidateKeyFromSidenav = new Subject<any>();
  emitCandidateNameFromCard = new Subject<any>();
  emitCandidateTypeFromSplash = new Subject<any>();

  candidateKeyEmittedFromSidenav$ = this.emitCandidateKeyFromSidenav.asObservable();
  candidateNameEmittedFromCard$ = this.emitCandidateNameFromCard.asObservable();
  candidateTypeEmittedFromSplash$ = this.emitCandidateTypeFromSplash.asObservable();

  constructor() { }

  emitCandidateKeySidenav(key: string) {
    this.emitCandidateKeyFromSidenav.next(key);
  }

  emitCandidateNameCard(key: string) {
    this.emitCandidateNameFromCard.next(key);
  }

  emitCandidateTypeSplash(key: string) {
    this.emitCandidateTypeFromSplash.next(key);
  }
}
