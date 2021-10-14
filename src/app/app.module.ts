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
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CandidateCardComponent } from './components/candidate-card/candidate-card.component';
import { CandidateCardExpandedComponent } from './components/candidate-card-expanded/candidate-card-expanded.component';
import { ChartsModule } from 'ng2-charts';
import { FaqComponent } from './components/faq/faq.component';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { SplashComponent } from './components/splash/splash.component';
import { UnderConstructionComponent } from './components/under-construction/under-construction.component';
import { RoundCurrencyDisplayPipe } from './pipes/round-currency-display.pipe';
import { VvChartsModule } from './vv-charts/vv-charts.module';
import { CandidateQuickViewModule } from './candidate-quick-view/candidate-quick-view.module';
import { CandidateModule } from './candidate/candidate.module';

import { CandidateNavigationComponent } from './components/candidate-navigation/candidate-navigation.component';
import { OfficeComponent } from './components/office/office.component';
import { APIStoreModule } from './store/api.store.module';

@NgModule({
  exports: [
    MatExpansionModule,
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    SplashComponent,
    FaqComponent,
    UnderConstructionComponent,
    CandidateCardComponent,
    CandidateCardExpandedComponent,
    AboutComponent,
    RoundCurrencyDisplayPipe,
    CandidateNavigationComponent,
    OfficeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
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
    VvChartsModule,
    CandidateQuickViewModule,
    CandidateModule,
    APIStoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
