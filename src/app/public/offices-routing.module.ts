import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SplashModule } from '../routed/splash/splash.module';
import { SplashComponent } from '../routed/splash/splash.component';
import { SummaryModule } from '../routed/summary/summary.module';
import { SummaryComponent } from '../routed/summary/summary.component';
import { OfficeCardListRoutedModule } from '../routed/office-card-list-routed/office-card-list-routed.module';
import { OfficeCardListRoutedComponent } from '../routed/office-card-list-routed/office-card-list-routed.component';

const routes: Routes = [
  { 
    path: '', 
    component: SplashComponent, 
    children: [
      { 
        path: '', component: SummaryComponent,
        children: [
          {
            path: '', component: OfficeCardListRoutedComponent, 
          }
        ]
      }
    ], 
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    SplashModule,
    SummaryModule,
    OfficeCardListRoutedModule,
  ],
  exports: [RouterModule]
})
export class OfficesRoutingModule { }
