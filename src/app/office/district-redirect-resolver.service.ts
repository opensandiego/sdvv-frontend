import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { EMPTY } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DistrictRedirectResolverService {

  constructor(private router: Router) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    const year = route.paramMap.get('year');
    const district = route.paramMap.get('district_number');
    const officeName = route.paramMap.get('office_name');

    const districtNumber = parseInt(district);
    const yearNumber = parseInt(year)

    if ( !Number.isInteger(districtNumber) 
      || !Number.isInteger(yearNumber)
      || !officeName ) 
    { return EMPTY; }

    if (district === '0') {
      const officeWithDistricts = 'City-Council';
      if (officeName.toLowerCase() === officeWithDistricts.toLowerCase()) {
        // Check to see if the default City Council district should be 1 or 2.
        // For the years 2016 and 2020 the default district will be 1
        // For the years 2018 and 2022 the default district will be 2
        // This check should not be needed after the City Council map component is completed.
        const pathSuffix = yearNumber % 4 === 0 ? '1' : '2'
        const newRoute = `year/${yearNumber}/office/${officeName}/${pathSuffix}`;
        this.router.navigate([newRoute]);
      }
    }

    return { office: this.getName(officeName) };
  }

  getName(officeName: string): string {
    const splitNames = officeName.split('-');
    const newNames = splitNames.map(name => name[0].toLocaleUpperCase() + name.substring(1))
    return newNames.join(' ')
  }
}