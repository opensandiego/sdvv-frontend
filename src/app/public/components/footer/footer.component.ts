import { Component, OnInit } from '@angular/core';
import { LastUpdatedService } from 'src/app/store/services/last-updated.service';

@Component({
  selector: 'footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  lastUpdatedDate: string;

  constructor(
    private lastUpdatedService: LastUpdatedService,
  ) { }

  ngOnInit(): void {     
    this.lastUpdatedService.getLastUpdated('2020')
      .subscribe(update => this.lastUpdatedDate = update.updated);
  }
}
