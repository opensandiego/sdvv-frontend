import { Component, OnInit } from '@angular/core';
import { Candidate } from '../../../candidate';
import { CandidateService } from '../../../services/candidate.service';

@Component({
  selector: 'app-council-district-three',
  templateUrl: './council-district-three.component.html',
  styleUrls: ['./council-district-three.component.scss']
})
export class CouncilDistrictThreeComponent implements OnInit {
  candidates: any[];
  candidate: Candidate;
  candidateImg: string;
  
  candidateImages: string[] = [];
  isExpanded: boolean = false;

  constructor(private candidateService: CandidateService) { }

  ngOnInit() {
    this.candidateService.getCityCouncilorsDistrict3().then(
      district3Councilors => {
        this.candidates = district3Councilors;
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
