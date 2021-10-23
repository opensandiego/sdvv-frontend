import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AboutComponent } from './components/about/about.component';
import { FaqComponent } from './components/faq/faq.component';
import { SplashComponent } from './components/splash/splash.component';
import { SplashHeroComponent } from './components/splash-hero/splash-hero.component';
import { UnderConstructionComponent } from './components/under-construction/under-construction.component';
import { PublicRoutingModule } from './public-routing.module';
import { RoundCurrencyDisplayPipe } from './pipes/round-currency-display.pipe';

@NgModule({
  declarations: [
    AboutComponent,
    FaqComponent,
    SplashComponent,
    SplashHeroComponent,
    UnderConstructionComponent,
    RoundCurrencyDisplayPipe,
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    FontAwesomeModule,
  ],
  exports: [
    AboutComponent,
    FaqComponent,
    SplashComponent,
    UnderConstructionComponent,    
  ]
})
export class PublicModule { }
