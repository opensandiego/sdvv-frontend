import { Component, OnInit, Input, Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Candidate } from '../../candidate';
@Component({
  selector: 'app-candidate-card',
  templateUrl: './candidate-card.component.html',
  styleUrls: ['./candidate-card.component.scss']
})

export class CandidateCardComponent implements OnInit {
  private canRender = false;
  data: any[];
  
  @Input() imageUrl: string = "../../assets/candidate-card/candidate.jpg";
  @Input() jsonFile: string;
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get("assets/candidates/2020/mayor/" + this.jsonFile)
      .toPromise()
      .then(res => {
        this.data = [];
        this.data.push(res);
        console.log(this.data);
        this.canRender = true;
      });
  }

}