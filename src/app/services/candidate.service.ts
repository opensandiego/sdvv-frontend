import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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

  getNumberOfCandidates(): Observable<any> {
    const campaignCandidateTotalsFilePath = "assets/candidates/2020/campaign_candidate_totals.json";

    const candidateCounts = this.http.get<any>(campaignCandidateTotalsFilePath)
      .pipe( // transform the property names used from those in the json file
        map(result => {
          return {
            'mayor': result['mayor'],
            'cityAttorney': result['city attorney'],
            'cityCouncil': result['city council']
          }
        })
      );

    return candidateCounts;
  }

  getNumberOfCandidatesByOffice(office: string): Observable<any> {
    return this.getNumberOfCandidates().pipe(
      map(offices => offices[office])
    )
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

  // City Council Candidates
  getCityCouncilorsByDistrict(districtNumber: string) {
    let districtName = `city-council-district-${districtNumber}`;

    return this.getAll().then(
      (all: Record<string, CandidateTree>) => Promise.all(
        Object.values(all[districtName].candidates).map(url => this.http.get(url).toPromise())
      )
    );
  }
}
