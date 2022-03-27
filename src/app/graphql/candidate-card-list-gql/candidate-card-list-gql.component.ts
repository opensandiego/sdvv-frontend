import { Component, Input, OnChanges } from '@angular/core';
import { CandidateService } from 'src/app/store/services/candidate.service';
import { CandidateCardListInfoGQL } from './candidate-card-list-gql.query';

@Component({
  selector: 'candidate-card-list-gql',
  styleUrls: ['./candidate-card-list.component.scss'],
  template: `
    <div class="candidate-cards grid justify-left nogutter">
      <div *ngFor="let id of candidateIds">
        <gql-candidate-card
          [candidateId]="id"
        ></gql-candidate-card>
      </div>
    </div>
  `,
})
export class CandidateCardListGQLComponent implements OnChanges {
  @Input() year: string;
  @Input() office: string;
  @Input() district: string;

  candidateIds: string[];

  constructor(
    private candidateService: CandidateService,
    private candidateCardListInfoGQL: CandidateCardListInfoGQL,
  ) { }

  setCandidateCards(): void {
    this.candidateService.getCandidates(
      { office: this.office, district: this.district, year: this.year }
    ).subscribe(candidates => {
      this.candidateIds = candidates.map(candidate => candidate.id);
    })
  }

  ngOnChanges() {
    const filters = {
      offices: this.office ? [this.office] : undefined,
      districts: this.district ? [this.district] : undefined,
    }

    this.candidateCardListInfoGQL.watch({
      year: this.year,
      filters: filters,
    }, {
      // errorPolicy: 'all',
    }).valueChanges.subscribe( (result: any) => {
      const response = result.data;

      const candidates = response?.candidates;
      this.candidateIds = candidates 
        ? candidates.map((candidate) => candidate.id) 
        : [];
      });
  }
}