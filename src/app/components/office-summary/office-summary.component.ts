import { Component } from '@angular/core';
import { OfficeCardListRoutedModule } from 'src/app/routed/office-card-list-routed/office-card-list-routed.module';

// This component might be in use currently
@Component({
  standalone: true,
  imports: [
    OfficeCardListRoutedModule,
  ],
  selector: 'office-summary',
  templateUrl: './office-summary.component.html',
  styleUrls: ['./office-summary.component.scss']
})
export class OfficeSummaryComponent { }
