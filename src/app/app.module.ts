import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';
import { SplashComponent } from './components/splash/splash.component';
import { MayorComponent } from './components/mayor/mayor.component';
import { CityAttorneyComponent } from './components/city-attorney/city-attorney.component';
import { CityCouncilComponent } from './components/city-council/city-council.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SplashComponent,
    MayorComponent,
    CityAttorneyComponent,
    CityCouncilComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
