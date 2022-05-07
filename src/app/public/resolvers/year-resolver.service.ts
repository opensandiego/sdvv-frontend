import { Injectable } from '@angular/core';
import { electionYearVar } from 'src/app/graphql/cache';

@Injectable({
  providedIn: 'root',
})
export class YearResolverService {
  resolve( ): boolean {
    electionYearVar('');
    return true;
  }
}
