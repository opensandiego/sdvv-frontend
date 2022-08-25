import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faBalanceScale, faMapMarkedAlt, faQuestion, faUniversity } from '@fortawesome/free-solid-svg-icons';

import { FaqComponent } from './components/faq/faq.component';
import { UnderConstructionComponent } from './components/under-construction/under-construction.component';
import { PublicRoutingModule } from './public-routing.module';
import { RoundCurrencyDisplayPipe } from './pipes/round-currency-display.pipe';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { OfficeSummaryComponent } from './components/office-summary/office-summary.component';
import { OfficeCardListRoutedModule } from '../routed/office-card-list-routed/office-card-list-routed.module';

@NgModule({
  declarations: [
    FaqComponent,
    OfficeSummaryComponent,
    UnderConstructionComponent,
    RoundCurrencyDisplayPipe,
    NotFoundComponent,
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    FontAwesomeModule,
    OfficeCardListRoutedModule,
  ],
  exports: [
    FaqComponent,
    UnderConstructionComponent,
  ],
  providers: [],
})
export class PublicModule { 
  constructor(library: FaIconLibrary) {
    // Add an icon to the library for convenient access in other components
    library.addIcons(faUniversity, faBalanceScale, faMapMarkedAlt, faQuestion);
  }
}
