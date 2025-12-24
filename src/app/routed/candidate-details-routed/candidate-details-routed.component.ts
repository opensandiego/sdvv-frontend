import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CandidateDetailsContainerComponent } from 'src/app/pages/candidates/details/candidate-details/candidate-details-container.component';

@Component({
  selector: 'candidate-details-routed',
  template: `
    <candidate-details-container
      [candidateId]="candidateId"
    ></candidate-details-container>
  `,
  imports: [RouterModule, CandidateDetailsContainerComponent],
})
export class CandidateDetailsRoutedComponent implements OnInit {
  candidateId: string;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      const candidateId = params.get('candidateId');
      this.candidateId = candidateId ? candidateId : '';
    });
  }
}
