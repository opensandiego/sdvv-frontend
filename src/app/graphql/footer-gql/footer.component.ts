import { Component, OnInit } from '@angular/core';
import { LastUpdateGQL, LastUpdateResponse } from './last-update-gql.query';

@Component({
  selector: 'footer-gql',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterGQLComponent implements OnInit {
  lastUpdatedDate: string;

  constructor(
    private lastUpdateGQL: LastUpdateGQL,
  ) { }

  ngOnInit(): void {     
    this.update();
  }

  update() {
    this.lastUpdateGQL
      .watch().valueChanges.subscribe( (result: any) => {
      const response: LastUpdateResponse = result.data;
      const dateTime = response.lastUpdate.dateTime;
      this.lastUpdatedDate = dateTime;
    });
  }
}
