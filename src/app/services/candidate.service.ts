import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {

  constructor(public http: HttpClient) { }

  getMayorData() {
    return this.http.get(`assets/candidates/2020/mayor/barbara_bry/barbara_bry.json`)
  }
}
