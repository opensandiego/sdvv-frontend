import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { globals } from 'src/app/globals';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor(
    private titleService: Title,
  ) { }

  ngOnInit() {
    const pageTitle = `About | ${globals.pageTitleSuffix}`;
    this.titleService.setTitle(pageTitle);
  }

}
