import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { District } from 'src/app/navigation-menu/interfaces/district';
import { Candidate } from 'src/app/store/interfaces/candidate';
import { Office } from 'src/app/store/interfaces/office';

@Injectable({
  providedIn: 'root',
})
export class RoutingService {
  private officeRootPath = 'office/';

  constructor(
  ) { }

  getOfficeRoute(office: Office) {
    return this.officeRootPath + office.office.toLowerCase().split(' ').join('-');
  }

  getDistrictRoute(district: District) {
    return `${this.officeRootPath}${district.office}/${district.district_number}`.toLowerCase().split(' ').join('-');
  }

  getCandidateRoute(candidate: Candidate) {
    let path = `${candidate.office}`;

    if (candidate.district !== null) {
      path += `_district-${candidate.district}`;
    }

    return `${this.officeRootPath}${path}/${candidate.id}`.toLowerCase().split(' ').join('-');
  }

}

