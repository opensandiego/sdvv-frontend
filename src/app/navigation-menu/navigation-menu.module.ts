import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUniversity, faBalanceScale, faMapMarkedAlt, faQuestion, faBars, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { PublicModule } from '../public/public.module';
import { HeaderComponent } from './components/header/header.component';
import { SideMenuService } from './services/side-menu.service';
import { MenuModule } from 'primeng/menu';
import { PanelMenuModule } from 'primeng/panelmenu';
import { BreadcrumbTitleModule } from '../public/components/breadcrumb/breadcrumb-title.module';
import { ElectionYearRoutedModule } from '../routed/election-year-routed/election-year-routed.module';
import { CandidateMenuRoutedModule } from '../routed/candidate-menu-routed/candidate-menu-routed.module';
import { FooterGQLModule } from '../graphql/footer-gql/footer.module';

@NgModule({
  declarations: [
    HeaderComponent,
  ],
  imports: [
    CommonModule,
    MatSidenavModule,
    RouterModule,
    FontAwesomeModule,
    PublicModule,
    MenuModule,
    PanelMenuModule,
    BreadcrumbTitleModule,
    ElectionYearRoutedModule,
    CandidateMenuRoutedModule,
    FooterGQLModule,
  ],
  exports: [
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
