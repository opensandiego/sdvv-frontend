import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {

  constructor(public http: HttpClient) { }

  // Mayoral Candidates
  getBarbaraBryData() {
    return this.http.get(`assets/candidates/2020/mayor/barbara_bry/barbara_bry.json`);
  }

  getTashaWilliamsonData() {
    return this.http.get('assets/candidates/2020/mayor/tasha_williamson/tasha_williamson.json');
  }

  getToddGloriaData() {
    return this.http.get('assets/candidates/2020/mayor/todd_gloria/todd_gloria.json');
  }
}
