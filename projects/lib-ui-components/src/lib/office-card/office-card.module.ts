import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faBalanceScale, faMapMarkedAlt, faQuestion, faUniversity, faTimes } from '@fortawesome/free-solid-svg-icons';

import { OfficeCardComponent } from './office-card.component';
import { SharedPipesModule } from '../shared/shared-pipes.module';

@NgModule({
  declarations: [
    OfficeCardComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    FontAwesomeModule,
    SharedPipesModule,
  ],
  exports: [
    OfficeCardComponent,
  ]
})
export class OfficeCardModule {
  constructor(library: FaIconLibrary) {
    // Add an icon to the library for convenient access in other components
    library.addIcons(faUniversity, faBalanceScale, faMapMarkedAlt, faQuestion, faTimes);
  }
}
