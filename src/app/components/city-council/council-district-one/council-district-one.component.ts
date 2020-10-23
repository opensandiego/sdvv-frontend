import { Component, OnInit } from '@angular/core';
import { Candidate } from '../../../candidate';
import { CandidateService } from '../../../services/candidate.service';

@Component({
  selector: 'app-council-district-one',
  templateUrl: './council-district-one.component.html',
  styleUrls: ['./council-district-one.component.scss']
})
export class CouncilDistrictOneComponent implements OnInit {
  candidates: any[];
  candidate: Candidate;
  candidateImg: string;
  
  candidateImages: string[] = [];
  isExpanded: boolean = false;

  constructor(private candidateService: CandidateService) { }

  ngOnInit() {
    this.candidateService.getCityCouncilorsDistrict1().then(
      district1Councilors => {
        this.candidates = district1Councilors;
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
