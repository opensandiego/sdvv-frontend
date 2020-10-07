import { Component, OnInit } from '@angular/core';
import { Candidate } from '../../../candidate';
import { CandidateService } from '../../../services/candidate.service';

@Component({
  selector: 'app-council-district-seven',
  templateUrl: './council-district-seven.component.html',
  styleUrls: ['./council-district-seven.component.scss']
})
export class CouncilDistrictSevenComponent implements OnInit {
  candidates: any[];
  candidate: Candidate;
  candidateImg: string;
  
  candidateImages: string[] = [];
  isExpanded: boolean = false;

  constructor(private candidateService: CandidateService) { }

  ngOnInit() {
    this.candidateService.getCityCouncilorsDistrict7().then(
      district7Councilors => {
        this.candidates = district7Councilors;
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
