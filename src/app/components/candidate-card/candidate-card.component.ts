import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SidenavService } from '../../services';

@Component({
  selector: 'app-candidate-card',
  templateUrl: './candidate-card.component.html',
  styleUrls: ['./candidate-card.component.scss']
})

export class CandidateCardComponent implements OnInit {
  @Input() candidate: any;
  @Input() candidateImg: string;
  @Output() private emitCandidateData = new EventEmitter<any>();
  @Output() private emitCandidateImage = new EventEmitter<any>();

  constructor(private sidenavService: SidenavService) {
    sidenavService.changeEmittedFromSidenav$.subscribe(res => {
      if (res === this.candidate['candidate name']) {
        this.outputCandidateData();
      }
    })
  }

  ngOnInit() {
  }

  outputCandidateData() {
    this.emitCandidateData.emit(this.candidate);
    this.emitCandidateImage.emit(this.candidateImg);
  }
}
