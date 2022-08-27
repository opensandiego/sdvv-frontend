import { Component } from '@angular/core';
import { OfficeCardListRoutedComponent } from 'src/app/routed/office-card-list-routed/office-card-list-routed.component';

// This component might NOT be in use currently
@Component({
  standalone: true,
  imports: [
    OfficeCardListRoutedComponent,
  ],
  selector: 'office-summary',
  templateUrl: './office-summary.component.html',
  styleUrls: ['./office-summary.component.scss']
})
export class OfficeSummaryComponent { }
