import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'candidate-summary-routed',
  template: `
    <candidate-summary-container
      [candidateId]="candidateId"
    ></candidate-summary-container>
  `,
})
export class CandidateSummaryRoutedComponent implements OnInit {
  candidateId: string;

  constructor(
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void { 

    this.activatedRoute.paramMap.subscribe(params => {
      const candidateId = params.get('candidateId');
      this.candidateId = candidateId ? candidateId : '';
    })

  }
}
