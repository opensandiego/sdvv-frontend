import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faBalanceScale, faMapMarkedAlt, faQuestion, faUniversity } from '@fortawesome/free-solid-svg-icons';

import { OfficeCardComponent } from './office-card.component';
import { RoundCurrencyDisplayPipe } from '../shared/pipes/round-currency-display.pipe';

@NgModule({
  declarations: [
    OfficeCardComponent,
    RoundCurrencyDisplayPipe,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    FontAwesomeModule,
  ],
  exports: [
    OfficeCardComponent,
  ]
})
export class OfficeCardModule {
  constructor(library: FaIconLibrary) {
    // Add an icon to the library for convenient access in other components
    library.addIcons(faUniversity, faBalanceScale, faMapMarkedAlt, faQuestion);
  }
}
