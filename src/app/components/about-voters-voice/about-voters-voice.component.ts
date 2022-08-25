
import { Component, OnInit } from '@angular/core';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';

import { faBinoculars, faMoneyBill, faHandshake, faGavel } from '@fortawesome/free-solid-svg-icons';
import { faBalanceScale, faMapMarkedAlt, faQuestion, faUniversity } from '@fortawesome/free-solid-svg-icons';

@Component({
  standalone: true,
  imports: [
    FontAwesomeModule,
  ],
  selector: 'about-voters-voice',
  templateUrl: './about-voters-voice.component.html',
  styleUrls: ['./about-voters-voice.component.scss'],
})
export class AboutVotersVoiceComponent {
  constructor(library: FaIconLibrary) {
    // Add an icon to the library for convenient access in other components
    library.addIcons(faUniversity, faBalanceScale, faMapMarkedAlt, faQuestion);
  }  

  faBinoculars = faBinoculars; 
  faMoneyBill = faMoneyBill; 
  faHandshake = faHandshake; 
  faGavel = faGavel;

}
