import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faBalanceScale, faMapMarkedAlt, faQuestion, faUniversity } from '@fortawesome/free-solid-svg-icons';

import { PublicRoutingModule } from './public-routing.module';
import { RoundCurrencyDisplayPipe } from './pipes/round-currency-display.pipe';

@NgModule({
  declarations: [
    RoundCurrencyDisplayPipe,
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    FontAwesomeModule,
  ],
  exports: [],
  providers: [],
})
export class PublicModule { 
  constructor(library: FaIconLibrary) {
    // Add an icon to the library for convenient access in other components
    library.addIcons(faUniversity, faBalanceScale, faMapMarkedAlt, faQuestion);
  }
}
