import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUniversity, faBalanceScale, faMapMarkedAlt, faQuestion, faBars, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { MenuModule } from 'primeng/menu';
import { PanelMenuModule } from 'primeng/panelmenu';
import { CandidateMenuComponent } from './candidate-menu.component';

@NgModule({
  declarations: [
    CandidateMenuComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    MenuModule,
    PanelMenuModule,
  ],
  exports: [
    CandidateMenuComponent,
  ],
  providers: []
})
export class CandidateMenuModule {
  constructor(library: FaIconLibrary) {
    // Add an icon to the library for convenient access in other components
    library.addIcons(faUniversity, faBalanceScale, faMapMarkedAlt, faQuestion, faBars, faChevronRight);
  }
}
