import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { electionYearVar } from 'src/app/graphql/cache';

@Injectable({
  providedIn: 'root',
})
export class YearRouteResolverService {
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ) {
    const year = route.paramMap.get('year');
    
    const newYear = year ? year : '';

    electionYearVar(newYear)

    return newYear;
  }
}
