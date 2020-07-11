import { Component, OnInit, Input, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Candidate } from "../../candidate";
import { environment } from "@environments/environment";

@Component({
  selector: 'app-candidate-card',
  templateUrl: './candidate-card.component.html',
  styleUrls: ['./candidate-card.component.scss'],
})

export class CandidateCardComponent implements OnInit {
  canRender = false;
  data: any[];
  environmentName = '';
  environmentUrl = 'Debug URL';

  @Input() imageUrl: string = '../../assets/candidate-card/candidate.jpg';
  @Input() jsonFile: string;

  constructor(private http: HttpClient) {
    this.environmentName = environment.environmentName;
    this.environmentUrl = environment.environmentUrl;
  }

  ngOnInit() {
      
    this.http
      .get("assets/candidates/2020/mayor/" + this.jsonFile)
      .toPromise()
      .then((res) => {
        this.data = [];
        this.data.push(res);
        console.log(this.data);
        console.log(this.environmentName);
        console.log(this.environmentUrl);
        this.canRender = true;
      });
  }
}
