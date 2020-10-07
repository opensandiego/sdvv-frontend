import { Component, OnInit } from '@angular/core';
import { Candidate } from '../../../candidate';
import { CandidateService } from '../../../services/candidate.service';

@Component({
  selector: 'app-council-district-five',
  templateUrl: './council-district-five.component.html',
  styleUrls: ['./council-district-five.component.scss']
})
export class CouncilDistrictFiveComponent implements OnInit {
  candidates: any[];
  candidate: Candidate;
  candidateImg: string;
  
  candidateImages: string[] = [];
  isExpanded: boolean = false;

  constructor(private candidateService: CandidateService) { }

  ngOnInit() {
    this.candidateService.getCityCouncilorsDistrict5().then(
      district5Councilors => {
        this.candidates = district5Councilors;
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
