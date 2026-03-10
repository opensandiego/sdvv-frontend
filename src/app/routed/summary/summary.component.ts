import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { globals } from 'src/app/globals';
import { LastUpdatedComponent } from "src/app/graphql/last-updated/last-updated.component";

@Component({
  imports: [RouterModule, LastUpdatedComponent],
  selector: 'summary-item',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
})
export class SummaryComponent {
  public title = globals.siteName;
  public subTitle = globals.siteSubTitle;
  public caption = globals.siteCaption;
}
