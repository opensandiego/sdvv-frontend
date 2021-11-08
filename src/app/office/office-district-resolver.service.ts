import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { take, mergeMap } from 'rxjs/operators';
import { OfficeService } from '../store/services/office.service';

@Injectable({
  providedIn: 'root',
})
export class OfficeDistrictResolverService {

  constructor(
    private officeService: OfficeService,
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Observable<never> {
    const year = '2020';
    const districtNumber = route.paramMap.get('district_number');
    const officeName = route.paramMap.get('office_name');

    if (!Number.isInteger(parseInt(districtNumber))) { return EMPTY; }

    return this.officeService.getOffices(year).pipe(
      take(1),
      mergeMap(offices => {
        const foundOffice = offices.find(office => this.getName(office) ===officeName);
        if (!foundOffice) {
          return EMPTY;
        } else if (!foundOffice.has_districts && districtNumber === '0') { 
          return of(foundOffice);
        } else if (foundOffice.has_districts && foundOffice.districts.includes(districtNumber)) {
          return of(foundOffice);        
        } else {
          return EMPTY;
        }
      })
    )
  }

  getName(office): string {
    return office.office.toLowerCase().split(' ').join('-');
  }
}
