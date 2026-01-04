import { Routes } from '@angular/router';

export const OFFICE_ROUTES: Routes = [
  { 
    path: '', 
    loadComponent: () => import('../components/summary-container/summary-container.component').then(mod => mod.SummaryContainerComponent),
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
