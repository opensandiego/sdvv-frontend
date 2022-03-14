import { Component } from '@angular/core';
import { GoogleTagManagerService } from 'angular-google-tag-manager';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'sdvv-frontend';

  constructor(
    private gtmService: GoogleTagManagerService,
  ) { }

  ngOnInit(): void {
    this.gtmService.addGtmToDom();
  }
}
