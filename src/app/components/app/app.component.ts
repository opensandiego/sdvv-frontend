import { Component, OnInit } from '@angular/core';
import { GoogleTagManagerService } from 'angular-google-tag-manager';
import { NavigationMenuModule } from 'src/app/navigation-menu/navigation-menu.module';

@Component({
  standalone: true,
  imports: [
    NavigationMenuModule,
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'sdvv-frontend';

  constructor(
    private gtmService: GoogleTagManagerService,
  ) { }

  ngOnInit(): void {
    this.gtmService.addGtmToDom();
  }
}
