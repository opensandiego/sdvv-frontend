import { HttpClient, } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, from, iif } from 'rxjs';
import { first, map, mergeMap } from 'rxjs/operators';

/**
 * candidate-store.service: Provides access to data sources so that the dependents of this service 
 *  can use the data without needing to know its source. Current data sources are imported .ts files 
 *  and JSON files. Future sources will include data from an API. Data provided by this service is 
 *  in the form of observables that match specific interfaces. The application's components should
 *  not directly access this service. This service is intended to be primarily accessed by the 
 *  candidate-data.service.
 *  
 */

import { CandidateNavigation } from '../interfaces/candidateNavigation';
import { CandidateJSON } from '../interfaces/candidateJSON';

import { candidateNavigationItems } from '../../assets/candidates/mock-candidateNavigationItems';
import { candidateAssets } from '../../assets/candidates/mock-candidateAssetPaths';


@Injectable({
  providedIn: 'root',
})
export class CandidateStoreService {
  private defaultImagePath = 'assets/candidate-card/profile.png';

  constructor(public http: HttpClient) { }

  private hasCalculationsPath(navigationItem: CandidateNavigation): boolean {

    return candidateAssets
      .some(asset => asset.id === navigationItem.id && asset.calculationsPath.length > 0);

  }

  getCandidateList(): Observable<CandidateNavigation> {

    return from(candidateNavigationItems).pipe(
      mergeMap(
        navigationItem => iif(
          () => this.hasCalculationsPath(navigationItem),
          of(navigationItem),
        )
      ),
    );

  }

  getCandidate(id: string): Observable<CandidateNavigation> {
    
    return from(candidateNavigationItems).pipe(
      first(candidate => candidate.id === id),
    );

  }

  getCandidateExpandedData(id: string): Observable<CandidateJSON> {

    return from(candidateAssets).pipe(
      first(candidate => candidate.id === id),
      mergeMap(candidate => this.http.get<CandidateJSON>(candidate.calculationsPath)),
    );

  }

  getCandidateImageUrl(id: string): Observable<string> {

    return from(candidateAssets).pipe(
      first(candidate => candidate.id === id),
      map(candidate => 
        candidate.imagePath.length > 0 
          ? candidate.imagePath 
          : this.defaultImagePath
      ),
    );

  }

}
