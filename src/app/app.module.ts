import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule, Title } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { PublicModule } from './public/public.module';
import { NavigationMenuModule } from './navigation-menu/navigation-menu.module';

import { environment } from 'src/environments/environment';
import { NgxEchartsModule } from 'ngx-echarts';
const gtmID = environment.gtm;

@NgModule({
  exports: [
  ],
  declarations: [ ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    }),
    PublicModule,
    NavigationMenuModule,
  ],
  providers: [
    { provide: 'googleTagManagerId', useValue: gtmID },
    Title,
  ],
  bootstrap: []
})
export class AppModule { } // This module is not in current use
