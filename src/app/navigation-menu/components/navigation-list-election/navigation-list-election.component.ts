import { Component, OnInit } from '@angular/core';
import { Office } from 'src/app/store/interfaces/office';
import { OfficeService } from 'src/app/store/services/office.service';

@Component({
  selector: 'navigation-list-election',
  templateUrl: './navigation-list-election.component.html',
})
export class NavigationListElectionComponent implements OnInit {
  offices: Office[];

  constructor(
    private officeService: OfficeService,
  ) { }

  ngOnInit(): void {
    this.officeService.getOffices('2020')
      .subscribe(offices => this.offices = offices);
  }
}
