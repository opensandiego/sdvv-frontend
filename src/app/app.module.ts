import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { ChartsModule } from 'ng2-charts';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RoundCurrencyDisplayPipe } from './pipes/round-currency-display.pipe';
import { VvChartsModule } from './vv-charts/vv-charts.module';
import { CandidateQuickViewModule } from './candidate-quick-view/candidate-quick-view.module';
import { CandidateModule } from './candidate/candidate.module';

import { APIStoreModule } from './store/api.store.module';
import { PublicModule } from './public/public.module';
import { NavigationMenuModule } from './navigation-menu/navigation-menu.module';
import { OfficeModule } from './office/office.module';

@NgModule({
  exports: [
  ],
  declarations: [
    AppComponent,
    RoundCurrencyDisplayPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ChartsModule,
    HttpClientModule,
    VvChartsModule,
    CandidateQuickViewModule,
    CandidateModule,
    APIStoreModule,
    PublicModule,
    NavigationMenuModule,
    OfficeModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
