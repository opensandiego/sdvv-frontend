import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CandidateTree } from '../candidate';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {

  constructor(public http: HttpClient) { }

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

  // City Council Candidates
  getCityCouncilorsDistrict1() {
    return this.getAll().then(
      (all: Record<string, CandidateTree>) => Promise.all(
        Object.values(all["city-council-district-1"].candidates).map(url => this.http.get(url).toPromise())
      )
    );
  }
}
