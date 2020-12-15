import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
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
import { CityCouncilDistrictComponent } from './components/city-council-district/city-council-district.component';
import { RoundCurrencyDisplayPipe } from './pipes/round-currency-display.pipe';

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
    CityCouncilDistrictComponent,
    RoundCurrencyDisplayPipe,
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
