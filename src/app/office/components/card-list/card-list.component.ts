import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CandidateService } from 'src/app/store/services/candidate.service';

@Component({
  selector: 'card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss'],
})
export class CardListComponent implements OnInit {
  office: string;
  district: string;
  candidateIds: string[];
  year = '2020';

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private candidateService: CandidateService,
  ) { }

  setCandidateCards(): void {
    this.candidateService.getCandidates(
      { office: this.office, district: this.district, year: this.year }
    ).subscribe(candidates => {
      this.candidateIds = candidates.map(candidate => candidate.id);
    })
  }

  ngOnInit(): void {  
    this.activatedRoute.paramMap.subscribe(params => {
      this.office = this.activatedRoute.snapshot.data.office.office;
      this.district = params.get('district_number')
      this.district = this.district != '0' ? this.district : null;
      this.setCandidateCards();
    })
  }

  onOpenExpanded(candidateId: string) {
    this.router.navigate([candidateId], { relativeTo: this.activatedRoute });
  }

}
