import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SplashModule } from '../routed/splash/splash.module';
import { SplashComponent } from '../routed/splash/splash.component';
import { SummaryModule } from '../routed/summary/summary.module';
import { SummaryComponent } from '../routed/summary/summary.component';
import { YearCardListGQLModule } from '../graphql/year-card-list-gql/year-card-list-gql.module';
import { YearCardListGQLComponent } from '../graphql/year-card-list-gql/year-card-list-gql.component';

const routes: Routes = [
  { 
    path: '', 
    component: SplashComponent,
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
    RouterModule.forChild(routes),
    SplashModule,
    SummaryModule,
    YearCardListGQLModule,
  ],
  exports: [RouterModule]
})
export class YearsRoutingModule { }
