import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CandidateNavigationComponent } from './components/candidate-navigation/candidate-navigation.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUniversity, faBalanceScale, faMapMarkedAlt, faQuestion, faBars } from '@fortawesome/free-solid-svg-icons';
import { PublicModule } from '../public/public.module';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { SideMenuService } from './services/side-menu.service';

@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    CandidateNavigationComponent,
  ],
  imports: [
    CommonModule,
    MatExpansionModule,
    MatSidenavModule,
    MatListModule,
    RouterModule,
    FontAwesomeModule,
    PublicModule,
  ],
  exports: [
    HomeComponent,
    HeaderComponent,
    CandidateNavigationComponent,
  ],
  providers: [SideMenuService]
})
export class NavigationMenuModule {
  constructor(library: FaIconLibrary) {
    // Add an icon to the library for convenient access in other components
    library.addIcons(faUniversity, faBalanceScale, faMapMarkedAlt, faQuestion, faBars);
  }
}
