import { Component, OnInit } from '@angular/core';
import { CandidateService } from '../../services/candidate.service';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss']
})
export class SplashComponent implements OnInit {
  candidates: any;

  constructor(private candidateService: CandidateService) { }

  ngOnInit() {
    this.candidateService.getAll().then(
      all => {
        this.candidates = Object
          .keys(all)
          .map(k => {
            return {count: Object.keys(all[k]).length, ...all[k]};
          });
      }
    );
  }

}
