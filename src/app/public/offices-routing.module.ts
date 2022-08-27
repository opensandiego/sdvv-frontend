import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SummaryModule } from '../routed/summary/summary.module';
import { SummaryComponent } from '../routed/summary/summary.component';
import { OfficeCardListRoutedModule } from '../routed/office-card-list-routed/office-card-list-routed.module';
import { OfficeCardListRoutedComponent } from '../routed/office-card-list-routed/office-card-list-routed.component';

export const OFFICE_ROUTES: Routes = [
  { 
    path: '', 
    loadComponent: () => import('../components/summary-content/summary-content.component').then(mod => mod.SummaryContentComponent),
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
    RouterModule.forChild(OFFICE_ROUTES),
    SummaryModule,
    OfficeCardListRoutedModule,
  ],
  exports: [RouterModule]
})
export class OfficesRoutingModule { }
