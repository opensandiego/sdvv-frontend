import { Component, OnInit } from '@angular/core';
import { Candidate } from '../../candidate';
import { CandidateService } from '../../services/candidate.service';

@Component({
  selector: 'app-city-attorney',
  templateUrl: './city-attorney.component.html',
  styleUrls: ['./city-attorney.component.scss']
})
export class CityAttorneyComponent implements OnInit {
  candidates: any[];
  candidate: Candidate;
  candidateImg: string;
  
  candidateImages: string[] = [];
  isExpanded: boolean = false;

  constructor(private candidateService: CandidateService) { }

  ngOnInit() {
    this.candidateService.getCityAttorneys().then(
      attorneys => {
        this.candidates = attorneys;
      }
    );
  }

  getCandidate(candidate: Candidate) {
    this.candidate = candidate;
    this.isExpanded = true;
  }

  getCandidateImg(img: string) {
    this.candidateImg = img;
  }

  onClose(event: boolean) {
    this.isExpanded = event;
  }

}
