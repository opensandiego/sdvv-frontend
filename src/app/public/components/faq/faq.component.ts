import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { globals } from 'src/app/globals';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {

  constructor(
    private titleService: Title,
  ) { }

  ngOnInit() {
    const pageTitle = `Faq | ${globals.pageTitleSuffix}`;
    this.titleService.setTitle(pageTitle);
  }

}
