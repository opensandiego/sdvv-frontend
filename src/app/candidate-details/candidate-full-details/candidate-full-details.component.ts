import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-candidate-full-details',
  templateUrl: './candidate-full-details.component.html',
  styleUrls: ['./candidate-full-details.component.scss']
})
export class CandidateFullDetailsComponent implements OnInit {

  constructor() { }
  @Input() header;

  raisedVSpentData;
  raisedByIndustries;
  raisedByLocationData;
  outsideMoneyData;
  
  ngOnInit(): void {
  }

}
