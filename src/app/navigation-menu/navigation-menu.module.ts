import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CandidateNavigationComponent } from './components/candidate-navigation/candidate-navigation.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUniversity, faBalanceScale, faMapMarkedAlt, faQuestion, faBars, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { PublicModule } from '../public/public.module';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { SideMenuService } from './services/side-menu.service';
import { NavigationListElectionComponent } from './components/navigation-list-election/navigation-list-election.component';
import { NavigationPanelOfficeComponent } from './components/navigation-panel-office/navigation-panel-office.component';
import { NavigationPanelOfficeDistrictComponent } from './components/navigation-panel-district/navigation-panel-office-district.component';
import { NavigationPanelDistrictItemComponent } from './components/navigation-panel-district-item/navigation-panel-district-item.component';
import { NavigationItemCandidateComponent } from './components/navigation-item-candidate/navigation-item-candidate.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { MenuModule } from 'primeng/menu';
import { PanelMenuModule } from 'primeng/panelmenu';

@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    CandidateNavigationComponent,
    NavigationListElectionComponent,
    NavigationPanelOfficeComponent,
    NavigationPanelOfficeDistrictComponent,
    NavigationPanelDistrictItemComponent,
    NavigationItemCandidateComponent,
    SideMenuComponent,
  ],
  imports: [
    CommonModule,
    MatExpansionModule,
    MatSidenavModule,
    MatListModule,
    RouterModule,
    FontAwesomeModule,
    PublicModule,
    MenuModule,
    PanelMenuModule,
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
    library.addIcons(faUniversity, faBalanceScale, faMapMarkedAlt, faQuestion, faBars, faChevronRight);
  }
}
