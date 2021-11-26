import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class YearService {
  private electionYear = new Subject<string>();
  electionYearChanged$ = this.electionYear.asObservable();

  constructor(
  ) { }

  public changeElectionYear(year: string) {
    this.electionYear.next(year);
  }
}
