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
import { AboutComponent } from './components/about/about.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CandidateCardComponent } from './components/candidate-card/candidate-card.component';
import { CandidateCardExpandedComponent } from './components/candidate-card-expanded/candidate-card-expanded.component';
import { ChartsModule } from 'ng2-charts';
import { CityAttorneyComponent } from './components/city-attorney/city-attorney.component';
import { FaqComponent } from './components/faq/faq.component';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { MayorComponent } from './components/mayor/mayor.component';
import { NgModule } from '@angular/core';
import { SplashComponent } from './components/splash/splash.component';
import { UnderConstructionComponent } from './components/under-construction/under-construction.component';
import { CouncilDistrictOneComponent } from './components/city-council/council-district-one/council-district-one.component';
import { CouncilDistrictThreeComponent } from './components/city-council/council-district-three/council-district-three.component';
import { CouncilDistrictFiveComponent } from './components/city-council/council-district-five/council-district-five.component';
import { CouncilDistrictSevenComponent } from './components/city-council/council-district-seven/council-district-seven.component';
import { CouncilDistrictNineComponent } from './components/city-council/council-district-nine/council-district-nine.component';

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
    UnderConstructionComponent,
    CandidateCardComponent,
    CandidateCardExpandedComponent,
    AboutComponent,
    CouncilDistrictOneComponent,
    CouncilDistrictThreeComponent,
    CouncilDistrictFiveComponent,
    CouncilDistrictSevenComponent,
    CouncilDistrictNineComponent,
   
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
