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

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private candidateService: CandidateService,
  ) { }

  setCandidateCards(): void {
    this.candidateService.getCandidates(
      { office: this.office, district: this.district, year: '2020' }
    ).subscribe(candidates => {
      this.candidateIds = candidates.map(candidate => candidate.id);
    })
  }

  ngOnInit(): void {    
    this.activatedRoute.paramMap.subscribe(params => {      
      this.office = this.activatedRoute.snapshot.data.officeName;
      this.district = params.get('district')
      this.setCandidateCards();
    })
  }

  onOpenExpanded(candidateId: string) {
    this.router.navigate([candidateId], { relativeTo: this.activatedRoute });
  }

}
