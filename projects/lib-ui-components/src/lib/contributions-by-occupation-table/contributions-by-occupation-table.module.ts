import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';

import { ContributionsByOccupationTableComponent } from './contributions-by-occupation-table.component';

@NgModule({
  declarations: [
    ContributionsByOccupationTableComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatTableModule,
    FontAwesomeModule,
  ],
  exports: [
    ContributionsByOccupationTableComponent,
  ],
  providers: []
})
export class ContributionsByOccupationTableModule {
  constructor(library: FaIconLibrary) {
    // Add an icon to the library for access in components
    library.addIcons(faCircle);
  }
}
