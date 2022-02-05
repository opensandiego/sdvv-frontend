import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faBalanceScale, faMapMarkedAlt, faQuestion, faUniversity } from '@fortawesome/free-solid-svg-icons';

import { AboutComponent } from './components/about/about.component';
import { FaqComponent } from './components/faq/faq.component';
import { SplashComponent } from './components/splash/splash.component';
import { SplashHeroComponent } from './components/splash-hero/splash-hero.component';
import { OfficeSummaryCardComponent } from './components/office-summary-card/office-summary-card.component';
import { FooterComponent } from './components/footer/footer.component';
import { UnderConstructionComponent } from './components/under-construction/under-construction.component';
import { PublicRoutingModule } from './public-routing.module';
import { RoundCurrencyDisplayPipe } from './pipes/round-currency-display.pipe';
import { RoutingService } from './services/routing.service';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { OfficeSummaryComponent } from './components/office-summary/office-summary.component';
import { APIStoreModule } from '../store/api.store.module';

@NgModule({
  declarations: [
    AboutComponent,
    FaqComponent,
    SplashComponent,
    SplashHeroComponent,
    OfficeSummaryComponent,
    OfficeSummaryCardComponent,
    FooterComponent,
    UnderConstructionComponent,
    RoundCurrencyDisplayPipe,
    BreadcrumbComponent,
    NotFoundComponent,
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    FontAwesomeModule,
    BreadcrumbModule,
    APIStoreModule,
  ],
  exports: [
    AboutComponent,
    FaqComponent,
    SplashComponent,
    UnderConstructionComponent,
    FooterComponent,
    BreadcrumbComponent,
  ],
  providers: [RoutingService],
})
export class PublicModule { 
  constructor(library: FaIconLibrary) {
    // Add an icon to the library for convenient access in other components
    library.addIcons(faUniversity, faBalanceScale, faMapMarkedAlt, faQuestion);
  }
}
