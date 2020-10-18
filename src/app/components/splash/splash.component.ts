import { Component, OnInit } from '@angular/core';
import { CandidateService } from '../../services/candidate.service';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss']
})
export class SplashComponent implements OnInit {
  candidates: any;

  constructor(private candidateService: CandidateService) { }

  ngOnInit() {
    this.candidateService.getAll().then(
      all => {
        this.candidates = Object
          .keys(all)
          .map(k => {
            return {
              type: k,
              count: Object.keys(all[k]).length,
              title: all[k].title.split(" - ")[0],
              total: all[k].total || 0,
            };
          })
          .reduce(
            (prev, cur) => {
              const type = cur.type.split('/')[0];
              if (!prev[type]) {
                prev[type] = cur;
              } else {
                prev[type].count += cur.count;
                prev[type].total += cur.total;
              }
              return prev;
            },
            {},
          )
      }
    );
  }

}
