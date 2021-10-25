import { Component, Input, OnInit } from '@angular/core';
import { of, zip } from 'rxjs';
import { groupBy, map, mergeAll, mergeMap, toArray } from 'rxjs/operators';
import { Office } from 'src/app/store/interfaces/office';
import { CandidateService } from 'src/app/store/services/candidate.service';
import { District } from '../../interfaces/district';

@Component({
  selector: 'navigation-panel-office-district',
  templateUrl: './navigation-panel-office-district.component.html',
})
export class NavigationPanelOfficeDistrictComponent implements OnInit {
  @Input() officeWithDistricts: Office;
  districts: District[];

  constructor(
    private candidateService: CandidateService,
  ) { }

  ngOnInit(): void {
    this.candidateService
      .getCandidates({year: '2020', office: this.officeWithDistricts.office})
      .pipe(
        mergeAll(),
        groupBy(candidate => candidate.district),
        mergeMap(group => zip(of(group.key), group.pipe(toArray()))),
        map(item => ({
          district_number: item[0], 
          candidates: item[1],
          office: this.officeWithDistricts.office,
        })),
        toArray(),
      )
      .subscribe(districts => this.districts = districts);
  }
}
