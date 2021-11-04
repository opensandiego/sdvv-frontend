import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'quick-view-container',
  templateUrl: './quick-view-container.component.html',
  // styleUrls: ['./quick-view-container.component.scss'],
})
export class QuickViewContainerComponent implements OnInit {
  office: string;
  candidateId: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.candidateId = params.get('candidateId')
    })
  }

  onCloseExpanded() {
    const segments = this.router.url.split('/');
    segments.pop();
    const urlWithoutCandidateId = segments.join('/');
    this.router.navigate([urlWithoutCandidateId]);
  }

}
