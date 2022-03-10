import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { YearService } from 'src/app/store/services/year.service';

@Injectable({
  providedIn: 'root',
})
export class YearRouteResolverService {

  constructor(
    private yearService: YearService,
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ) {
    const year = route.paramMap.get('year');
    
    const newYear = year ? year : '';

    this.yearService.changeElectionYear(newYear);

    return newYear;
  }
}
