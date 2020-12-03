import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { Candidate } from '../../candidate';
import { CandidateService } from '../../services/candidate.service';

@Component({
  selector: 'app-city-council-district',
  templateUrl: './city-council-district.component.html',
  styleUrls: ['./city-council-district.component.scss']
})
export class CityCouncilDistrictComponent implements OnInit {
  candidates: any[];
  candidate: Candidate;
  candidateImg: string;
  
  candidateImages: string[] = [];
  isExpanded: boolean = false;

  constructor(private candidateService: CandidateService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      
      const district = params.get('id');

      this.isExpanded = false;

      this.candidateService.getCityCouncilorsByDistrict(district).then(
        districtCouncilors => {
          this.candidates = districtCouncilors;
        }
      );

    });
  }

  setCandidate(candidate: Candidate) {
    this.candidate = candidate;
    this.isExpanded = true;
  }

  setCandidateImg(img: string) {
    this.candidateImg = img;
  }

  onClose(event: boolean) {
    this.isExpanded = event;
  }

}
