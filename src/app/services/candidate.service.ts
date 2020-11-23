import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CandidateTree } from '../candidate';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {
  emitChangeSidenav = new Subject<any>();
  changeEmittedFromSidenav$ = this.emitChangeSidenav.asObservable();

  constructor(public http: HttpClient) { }

  emitChangeFromSidenav(change: string) {
    this.emitChangeSidenav.next(change);
  }

  getAll() {
    return this.http.get("assets/candidates/2020/candidates.json").toPromise();
  }

  // Mayoral Candidates
  getMayors() {
    return this.getAll().then(
      (all: Record<string, CandidateTree>) => Promise.all(
        Object.values(all["mayor"].candidates).map(url => this.http.get(url).toPromise())
      )
    );
  }

  // City Attorney Candidates
  getCityAttorneys() {
    return this.getAll().then(
      (all: Record<string, CandidateTree>) => Promise.all(
        Object.values(all["city-attorney"].candidates).map(url => this.http.get(url).toPromise())
      )
    );
  }

  getCityCouncilorsByDistrict(districtNumber: string) {
    let districtName = `city-council-district-${districtNumber}`;

    return this.getAll().then(
      (all: Record<string, CandidateTree>) => Promise.all(
        Object.values(all[districtName].candidates).map(url => this.http.get(url).toPromise())
      )
    );
  }

  // City Council Candidates
  getCityCouncilorsDistrict1() {
    return this.getAll().then(
      (all: Record<string, CandidateTree>) => Promise.all(
        Object.values(all["city-council-district-1"].candidates).map(url => this.http.get(url).toPromise())
      )
    );
  }

  getCityCouncilorsDistrict3() {
    return this.getAll().then(
      (all: Record<string, CandidateTree>) => Promise.all(
        Object.values(all["city-council-district-3"].candidates).map(url => this.http.get(url).toPromise())
      )
    );
  }

  getCityCouncilorsDistrict5() {
    return this.getAll().then(
      (all: Record<string, CandidateTree>) => Promise.all(
        Object.values(all["city-council-district-5"].candidates).map(url => this.http.get(url).toPromise())
      )
    );
  }

  getCityCouncilorsDistrict7() {
    return this.getAll().then(
      (all: Record<string, CandidateTree>) => Promise.all(
        Object.values(all["city-council-district-7"].candidates).map(url => this.http.get(url).toPromise())
      )
    );
  }

  getCityCouncilorsDistrict9() {
    return this.getAll().then(
      (all: Record<string, CandidateTree>) => Promise.all(
        Object.values(all["city-council-district-9"].candidates).map(url => this.http.get(url).toPromise())
      )
    );
  }
}
