import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { take, mergeMap } from 'rxjs/operators';
import { OfficeSummaryService } from 'src/app/store/services/office-summary.service';
import { YearService } from 'src/app/store/services/year.service';

@Injectable({
  providedIn: 'root',
})
export class OfficeSummaryResolverService {

  constructor(
    private officeSummaryService: OfficeSummaryService,
    private yearService: YearService,
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Observable<never> {
    const year = route.paramMap.get('year');

    return this.officeSummaryService.getSummary(year).pipe(
      take(1),
      mergeMap(offices => {
        if (offices.length > 0) {
          this.yearService.changeElectionYear(year);
          return of(offices);
        } else {
          return EMPTY;
        }
      })
    );

  }
}
