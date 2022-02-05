import { Injectable } from '@angular/core';
import { YearService } from 'src/app/store/services/year.service';

@Injectable({
  providedIn: 'root',
})
export class YearResolverService {

  constructor(
    private yearService: YearService,
  ) {}

  resolve( ): boolean {
    this.yearService.changeElectionYear('');
    return true;
  }
}
