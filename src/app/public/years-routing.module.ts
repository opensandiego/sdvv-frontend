import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SummaryModule } from '../routed/summary/summary.module';
import { SummaryComponent } from '../routed/summary/summary.component';
import { YearCardListGQLModule } from '../graphql/year-card-list-gql/year-card-list-gql.module';
import { YearCardListGQLComponent } from '../graphql/year-card-list-gql/year-card-list-gql.component';

export const YEAR_ROUTES: Routes = [
  { 
    path: '', 
    loadComponent: () => import('../components/summary-content/summary-content.component').then(mod => mod.SummaryContentComponent),
    children: [
      { 
        path: '', component: SummaryComponent,
        children: [
          {
            path: '', component: YearCardListGQLComponent,
          }
        ]
      }
    ], 
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(YEAR_ROUTES),
    SummaryModule,
    YearCardListGQLModule,
  ],
  exports: [RouterModule]
})
export class YearsRoutingModule { }
