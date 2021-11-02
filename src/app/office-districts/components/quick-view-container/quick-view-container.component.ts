import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CandidateService } from 'src/app/store/services/candidate.service';


@Component({
  selector: 'quick-view-container',
  templateUrl: './quick-view-container.component.html',
  // styleUrls: ['./quick-view-container.component.scss'],
})
export class QuickViewContainerComponent implements OnInit {
  office: string;
  candidateId: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    // private candidateService: CandidateService,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.candidateId = params.get('candidateId')
      console.log('QV params', params);
      console.log('QV this.candidateId', this.candidateId);
    })
  }

  onCloseExpanded() {
    console.log('QV close expanded');
    this.router.navigate([`../`], { relativeTo: this.route });
  }

}
