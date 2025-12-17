import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CandidateSummaryContainerModule } from 'src/app/pages/candidates/summary/candidate-summary/candidate-summary-container.module';

@Component({
  selector: 'candidate-summary-routed',
  template: `
    <candidate-summary-container
      [candidateId]="candidateId"
    ></candidate-summary-container>
  `,
  imports: [RouterModule, CandidateSummaryContainerModule],
})
export class CandidateSummaryRoutedComponent implements OnInit {
  candidateId: string;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      const candidateId = params.get('candidateId');
      this.candidateId = candidateId ? candidateId : '';
    });
  }
}
