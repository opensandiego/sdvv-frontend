import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'office-card-list-routed',
  template: `
    <div class="list" *ngFor="let title of officeTitles">
      <office-card-gql
        [year]="year"
        [officeTitle]="title"
      ></office-card-gql>
    </div>
  `,
  styleUrls: ['./office-card-list-routed.component.scss']
})
export class OfficeCardListRoutedComponent implements OnInit {
  year: string;
  officeTitles = [ 'Mayor', 'City Council', 'City Attorney' ];

  constructor(
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void { 
    this.activatedRoute.paramMap.subscribe(params => {
      // console.log({ params });
      this.year = params.get('year')
    })
  }
}
