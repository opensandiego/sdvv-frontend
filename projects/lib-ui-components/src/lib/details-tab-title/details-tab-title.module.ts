import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatLegacyTooltipModule as MatTooltipModule } from '@angular/material/legacy-tooltip';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DetailsTabTitleComponent } from './details-tab-title.component';

@NgModule({
  declarations: [
    DetailsTabTitleComponent,
  ],
  imports: [
    CommonModule,
    MatTooltipModule,
    FontAwesomeModule,
  ],
  exports: [
    DetailsTabTitleComponent,
  ],
})
export class DetailsTabTitleModule {
  constructor(library: FaIconLibrary) {
    // Add an icon to the library for access in components
    library.addIcons(faQuestionCircle);
  }
}
