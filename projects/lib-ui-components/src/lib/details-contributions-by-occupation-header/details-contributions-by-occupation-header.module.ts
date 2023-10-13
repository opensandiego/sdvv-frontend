import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSortAmountDownAlt, faSortAmountUp } from '@fortawesome/free-solid-svg-icons';

import { DetailsContributionsByOccupationHeaderComponent } from './details-contributions-by-occupation-header.component';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    FontAwesomeModule,
  ],
  declarations: [
    DetailsContributionsByOccupationHeaderComponent
  ],
  providers: [  ], 
  exports: [ DetailsContributionsByOccupationHeaderComponent ],
  bootstrap: []
})
export class DetailsContributionsByOccupationHeaderModule {
  constructor(library: FaIconLibrary) {
    // Add an icon to the library for access in components
    library.addIcons(faSortAmountUp, faSortAmountDownAlt);
  }
}
