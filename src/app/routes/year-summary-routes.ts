import { Routes } from '@angular/router';

export const YEAR_SUMMARY_ROUTES: Routes = [
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
            loadComponent: () => import('../graphql/year-card-list-gql/year-card-list-gql.component').then(mod => mod.YearCardListGQLComponent),
          }
        ]
      }
    ], 
  },
];
