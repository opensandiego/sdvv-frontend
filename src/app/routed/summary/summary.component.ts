import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { globals } from 'src/app/globals';

@Component({
    imports: [
        RouterModule,
    ],
    selector: 'summary',
    templateUrl: './summary.component.html',
    styleUrls: ['./summary.component.scss']
})
export class SummaryComponent { 
  public title = globals.siteName;
  public subTitle = globals.siteSubTitle;
  public caption = globals.siteCaption;
}
