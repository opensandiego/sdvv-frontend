import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

export const OFFICE_ROUTES: Routes = [
  { 
    path: '', 
    loadComponent: () => import('../components/summary-content/summary-content.component').then(mod => mod.SummaryContentComponent),
    children: [
      { 
        path: '', 
        loadComponent: () => import('../routed/summary/summary.component').then(mod => mod.SummaryComponent),
        children: [
          {
            path: '', 
            loadComponent: () => import('../routed/office-card-list-routed/office-card-list-routed.component').then(mod => mod.OfficeCardListRoutedComponent),
          }
        ]
      }
    ], 
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(OFFICE_ROUTES),
  ],
  exports: [RouterModule]
})
export class OfficesRoutingModule { }
