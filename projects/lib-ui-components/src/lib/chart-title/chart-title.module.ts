import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatLegacyTooltipModule as MatTooltipModule } from '@angular/material/legacy-tooltip';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { ChartTitleComponent } from './chart-title.component';

@NgModule({
  imports: [
    CommonModule,
    MatTooltipModule,
    FontAwesomeModule,
  ],
  declarations: [
    ChartTitleComponent,
  ],  
  providers: [ ], 
  exports: [ ChartTitleComponent ],
})
export class ChartTitleModule {
  constructor(library: FaIconLibrary) {
    // Add an icon to the library for access in components
    library.addIcons(faQuestionCircle);
  }
}
