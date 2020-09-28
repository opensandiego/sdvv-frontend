import { Component, OnInit } from '@angular/core';
import { Candidate } from '../../candidate';
import { CandidateService } from '../../services/candidate.service';

@Component({
  selector: 'app-mayor',
  templateUrl: './mayor.component.html',
  styleUrls: ['./mayor.component.scss']
})
export class MayorComponent implements OnInit {
  candidates: any[];
  candidate: Candidate;
  candidateImg: string;
  
  candidateImages: string[] = [
    'assets/candidates/2020/mayor/barbara_bry/barbara_bry.png',
    'assets/candidates/2020/mayor/tasha_williamson/tasha_williamson.png',
    'assets/candidates/2020/mayor/todd_gloria/todd_gloria.png',
  ];
  
  isExpanded: boolean = false;

  constructor(private candidateService: CandidateService) { }

  ngOnInit() {
    this.candidateService.getMayors().then(
      mayors => {
        this.candidates = mayors;
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
