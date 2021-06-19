import { Injectable } from '@angular/core';
import { Observable, } from 'rxjs';
import { map, toArray, mergeMap, filter, } from 'rxjs/operators';

/**
 * candidate-data.service: This service obtains data from the candidate-store.service and 
 *  provides the application with access to the data. This service is intended to be used 
 *  as an intermediatory for accessing the source data used in the application. Data 
 *  provided by this service is in the form of observables that match specific interfaces.
 * 
 */

import { CandidateStoreService } from './candidate-store.service';

import { CandidateNavigation } from '../interfaces/candidateNavigation'
import { CandidateCard } from '../interfaces/candidateCard';

import { RaisedVsSpent } from '../vv-charts/interfaces/raisedVsSpent';
import { RaisedInOut } from '../vv-charts/interfaces/raisedInOut';
import { OutsideMoney } from '../vv-charts/interfaces/outsideMoney';
import { DonationsByGroup } from '../vv-charts/interfaces/donationsByGroup';


@Injectable({
  providedIn: 'root',
})
export class CandidateDataService {
  private areaName = 'City of San Diego';
  private defaultJurisdiction = 'City';

  constructor(public CandidateStore: CandidateStoreService) { }

  getCandidates(): Observable<CandidateNavigation> {
    
    return this.CandidateStore.getCandidateList().pipe(
      toArray(),
      mergeMap(candidates => {
        return candidates.sort((firstCandidate, secondCandidate) => {
          const firstCandidateName = firstCandidate.fullName.toLowerCase();
          const secondCandidateName = secondCandidate.fullName.toLowerCase();
    
          if (firstCandidateName < secondCandidateName) return -1;
          if (firstCandidateName > secondCandidateName) return 1;
          return 0;
        });
      }),
    )

  }

  getCandidateCard(candidateId: string): Observable<CandidateCard> {

    return this.CandidateStore.getCandidate(candidateId).pipe(
      mergeMap(candidate => this.CandidateStore.getCandidateExpandedData(candidate.id).pipe(
        map(expandedData => ({candidate, expandedData}))
      )),
      mergeMap( ({candidate, expandedData})  => this.CandidateStore.getCandidateImageUrl(candidate.id).pipe(
        map(imageUrl => ({candidate, expandedData, imageUrl}))
      )),
      map( ({candidate, expandedData, imageUrl}) => ({
        id: candidate.id,
        name: candidate.fullName,
        description: expandedData['description'],
        raised: Number(expandedData['raised vs spent'][0]['Raised']),
        donors: Number(expandedData['raised vs spent'][0]['Donors']),
        candidateImgURL: imageUrl,
      }))
    );;

  }

  getCandidateCards(office?: string, seat?: string): Observable<CandidateCard> {

    return this.getCandidates().pipe(
      filter(candidate => 
        office ? candidate.officeType.toLowerCase() === office.toLowerCase() : true
      ),
      filter(candidate => 
        seat ? candidate.seat.name.toLowerCase() === seat.toLowerCase() : true
      ),
      mergeMap(candidate => this.getCandidateCard(candidate.id))
    );

  }

  getRaisedVsSpentChart(id: string): Observable<RaisedVsSpent> {

    return this.CandidateStore.getCandidate(id).pipe(
      mergeMap(candidate => this.CandidateStore.getCandidateExpandedData(candidate.id).pipe(
        map(expandedData => ({candidate, expandedData}))
      )),
      map( ({candidate, expandedData}) => ({
        id: candidate.id,
        raised: Number(expandedData["raised vs spent"][0]['Raised']),
        spent: Number(expandedData["raised vs spent"][0]['Spent']),
        averageDonation: Number(expandedData["raised vs spent"][0]['Average Donor']),
      }))
    );

  }

  getRaisedInOutChart(id: string): Observable<RaisedInOut> {

    return this.CandidateStore.getCandidate(id).pipe(
      mergeMap(candidate => this.CandidateStore.getCandidateExpandedData(candidate.id).pipe(
        map(expandedData => ({candidate, expandedData}))
      )),
      map( ({candidate, expandedData}) => ({
        id: candidate.id,
        inside: Number(expandedData["in vs out district"][0]['in']),
        outside: Number(expandedData["in vs out district"][0]['out']),
        areaName: this.areaName,
        jurisdiction: candidate?.seat ? candidate.seat.type : this.defaultJurisdiction,
        jurisdictionSuffix: candidate?.seat?.name,
      }))
    );

  }

  getOutsideMoneyChart(id: string): Observable<OutsideMoney>  {

    return this.CandidateStore.getCandidate(id).pipe(
      mergeMap(candidate => this.CandidateStore.getCandidateExpandedData(candidate.id).pipe(
        map(expandedData => ({candidate, expandedData}))
      )),
      map( ({candidate, expandedData}) => ({
        id: candidate.id,
        support: Number(expandedData["support"]),
        oppose: Number(expandedData["oppose"]),
      }))
    );

  }

  getDonationsByGroupChart(id: string): Observable<DonationsByGroup> {

    return this.CandidateStore.getCandidate(id).pipe(
      mergeMap(candidate => this.CandidateStore.getCandidateExpandedData(candidate.id).pipe(
        map(expandedData => ({candidate, expandedData}))
      )),
      map( ({candidate, expandedData}) => {
        const groups = Object.values(expandedData["by industry"][0]).map(group => 
          ({
            name: group[0],
            amount: Number(group[1]),
            percent:Number( group[2])
          })
        );

        return { id: candidate.id, groups }
      })
    );

  }

}
