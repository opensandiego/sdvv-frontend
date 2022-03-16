import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule, Title } from '@angular/platform-browser';
import { ChartsModule } from 'ng2-charts';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { VvChartsModule } from './vv-charts/vv-charts.module';
import { CandidateQuickViewModule } from './candidate-quick-view/candidate-quick-view.module';
import { CandidateModule } from './candidate/candidate.module';

import { APIStoreModule } from './store/api.store.module';
import { PublicModule } from './public/public.module';
import { NavigationMenuModule } from './navigation-menu/navigation-menu.module';
import { CandidateDetailsModule } from './candidate-details/candidate-details.module';

import { environment } from 'src/environments/environment';
const gtmID = environment.gtm;

@NgModule({
  exports: [
  ],
  declarations: [
    AppComponent,
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
    CandidateDetailsModule,
  ],
  providers: [
    { provide: 'googleTagManagerId', useValue: gtmID },
    Title,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
