import { Component, OnInit } from '@angular/core';
// commented out due to version: 1.11.0 having peerDependencies on angular 19 packages
// import { GoogleTagManagerService } from 'angular-google-tag-manager';
import { HomeComponent } from '../home/home.component';

@Component({
    imports: [
        HomeComponent,
    ],
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'sdvv-frontend';

  constructor(
    // private gtmService: GoogleTagManagerService,
  ) { }

  ngOnInit(): void {
    // this.gtmService.addGtmToDom();
  }
}
