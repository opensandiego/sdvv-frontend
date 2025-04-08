import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'candidate-details-routed',
    template: `
    <candidate-details-container
      [candidateId]="candidateId"
    ></candidate-details-container>
  `,
    standalone: false
})
export class CandidateDetailsRoutedComponent implements OnInit {
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
