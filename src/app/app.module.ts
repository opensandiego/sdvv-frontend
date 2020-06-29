import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import {
  MatButtonModule,
  MatExpansionModule,
  MatIconModule,
  MatListModule,
  MatSidenavModule,
  MatTableModule,
  MatToolbarModule,
  MatTooltipModule,
} from '@angular/material';
import { ChartsModule } from 'ng2-charts';
import { HomeComponent } from './components/home/home.component';
import { SplashComponent } from './components/splash/splash.component';
import { MayorComponent } from './components/mayor/mayor.component';
import { CityAttorneyComponent } from './components/city-attorney/city-attorney.component';
import { CityCouncilComponent } from './components/city-council/city-council.component';
import { UnderConstructionComponent } from './components/under-construction/under-construction.component';
import { DistrictOneComponent } from './components/city-council/district-one/district-one.component';
import { DistrictTwoComponent } from './components/city-council/district-two/district-two.component';
import { CandidateCardComponent } from './components/candidate-card/candidate-card.component';
import { CandidateCardExpandedComponent } from './components/candidate-card-expanded/candidate-card-expanded.component';
import { FaqComponent } from './components/faq/faq.component';

@NgModule({
  exports: [
    MatExpansionModule,
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    SplashComponent,
    FaqComponent,
    MayorComponent,
    CityAttorneyComponent,
    CityCouncilComponent,
    UnderConstructionComponent,
    DistrictOneComponent,
    DistrictTwoComponent,
    CandidateCardComponent,
    CandidateCardExpandedComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ChartsModule,
    MatButtonModule,
    HttpClientModule,
    MatExpansionModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatTableModule,
    MatToolbarModule,
    MatTooltipModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
