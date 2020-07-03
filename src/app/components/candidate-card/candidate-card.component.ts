import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
  @Output() private emitCandidateData = new EventEmitter<any>();
  @Output() private emitCandidateImg = new EventEmitter<any>();

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get("assets/candidates/2020/mayor/" + this.jsonFile)
      .toPromise()
      .then(res => {
        this.data = [];
        this.data.push(res);
        console.log(this.data);
        this.canRender = true;
        console.log(this.data)
      });
  }

  outputCandidateData() {
    this.emitCandidateData.emit(this.data);
    this.emitCandidateImg.emit(this.imageUrl);
  }

}
