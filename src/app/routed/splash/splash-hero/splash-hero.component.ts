import { Component, OnInit } from '@angular/core';
import { faBinoculars, faMoneyBill, faHandshake, faGavel } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'splash-hero',
  templateUrl: './splash-hero.component.html',
  styleUrls: ['./splash-hero.component.scss']
})
export class SplashHeroComponent {
  faBinoculars = faBinoculars; 
  faMoneyBill = faMoneyBill; 
  faHandshake = faHandshake; 
  faGavel = faGavel;
    
  constructor() { }
}
