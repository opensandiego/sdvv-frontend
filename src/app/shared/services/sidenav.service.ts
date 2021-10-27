import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {
  selectedCandidateChangedSource = new Subject<string>();
  selectedOfficeChangedSource = new Subject<string>();
  selectedSeatChangedSource = new Subject<string>();

  candidateChanged$ = this.selectedCandidateChangedSource.asObservable();
  officeChanged$ = this.selectedOfficeChangedSource.asObservable();
  officeSeatChanged$ = this.selectedSeatChangedSource.asObservable();

  emitCandidateKeyFromSidenav = new Subject<any>();
  emitCandidateNameFromCard = new Subject<any>();
  emitCandidateTypeFromSplash = new Subject<any>();

  candidateKeyEmittedFromSidenav$ = this.emitCandidateKeyFromSidenav.asObservable();
  candidateNameEmittedFromCard$ = this.emitCandidateNameFromCard.asObservable();
  candidateTypeEmittedFromSplash$ = this.emitCandidateTypeFromSplash.asObservable();

  constructor() { }

  changeSelectedOffice(officeName: string) {
    this.selectedOfficeChangedSource.next(officeName.toLowerCase());
  }

  changeSelectedSeat(seat: string) {
    this.selectedSeatChangedSource.next(seat);
  }

  changeSelectedCandidate(id: string) {
    this.selectedCandidateChangedSource.next(id);
  }

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
