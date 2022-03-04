import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUniversity, faBalanceScale, faMapMarkedAlt, faQuestion, faBars, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { PublicModule } from '../public/public.module';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { SideMenuService } from './services/side-menu.service';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { MenuModule } from 'primeng/menu';
import { PanelMenuModule } from 'primeng/panelmenu';
import { ElectionYearRoutedModule } from '../routed/election-year-routed/election-year-routed.module';

@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    SideMenuComponent,
  ],
  imports: [
    CommonModule,
    MatSidenavModule,
    RouterModule,
    FontAwesomeModule,
    PublicModule,
    MenuModule,
    PanelMenuModule,
    ElectionYearRoutedModule,
  ],
  exports: [
    HomeComponent,
    HeaderComponent,
  ],
  providers: [SideMenuService]
})
export class NavigationMenuModule {
  constructor(library: FaIconLibrary) {
    // Add an icon to the library for convenient access in other components
    library.addIcons(faUniversity, faBalanceScale, faMapMarkedAlt, faQuestion, faBars, faChevronRight);
  }
}
