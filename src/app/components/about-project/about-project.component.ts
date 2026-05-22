import { Component } from '@angular/core';
import {
  FontAwesomeModule,
  FaIconLibrary,
} from '@fortawesome/angular-fontawesome';
import {
  faBinoculars,
  faMoneyBill,
  faHandshake,
  faGavel,
} from '@fortawesome/free-solid-svg-icons';
import {
  faBalanceScale,
  faMapMarkedAlt,
  faQuestion,
  faUniversity,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  imports: [FontAwesomeModule],
  selector: 'about-project',
  templateUrl: './about-project.component.html',
  styleUrls: ['./about-project.component.scss'],
})
export class AboutProjectComponent {
  constructor(library: FaIconLibrary) {
    // Add an icon to the library for convenient access in other components
    library.addIcons(faUniversity, faBalanceScale, faMapMarkedAlt, faQuestion);
  }

  faBinoculars = faBinoculars;
  faMoneyBill = faMoneyBill;
  faHandshake = faHandshake;
  faGavel = faGavel;
}
