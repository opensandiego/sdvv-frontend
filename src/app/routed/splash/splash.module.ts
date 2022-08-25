import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faBalanceScale, faMapMarkedAlt, faQuestion, faUniversity } from '@fortawesome/free-solid-svg-icons';

import { SplashComponent } from './splash.component';
import { AboutVotersVoiceComponent } from 'src/app/components/about-voters-voice/about-voters-voice.component';

@NgModule({
  declarations: [
    SplashComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule,
    AboutVotersVoiceComponent,
  ],
  exports: [
    SplashComponent,
  ]
})
export class SplashModule {
  constructor(library: FaIconLibrary) {
    // Add an icon to the library for convenient access in other components
    library.addIcons(faUniversity, faBalanceScale, faMapMarkedAlt, faQuestion);
  }
}
