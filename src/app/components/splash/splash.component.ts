import { Component, OnInit } from '@angular/core';
import { SidenavService } from '../../services';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss']
})
export class SplashComponent implements OnInit {

  constructor(
    private sidenavService: SidenavService,
  ) { }

  ngOnInit() {
  }

  selectOffice(officeType: string) {
    this.sidenavService.emitCandidateTypeSplash(officeType);
  }

}
