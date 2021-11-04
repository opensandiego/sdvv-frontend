import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root',
})
export class ElectionService {
  private year = '2020';

  constructor(
  ) { }

  public getElectionYear(): string {
    return this.year;
  }
}
