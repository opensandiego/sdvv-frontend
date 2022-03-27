import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { GraphQLModule } from '../graphql.module';
import { ContributionsByCodeStackedBarModule } from 'projects/lib-ui-charts/src/lib/contributions-by-code-stacked-bar/contributions-by-code-stacked-bar.module';
import { ContributionsByCodeGQL } from './contributions-by-code-gql.query';
import { ContributionsByCodeGQLComponent } from './contributions-by-code-gql.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    GraphQLModule,
    ContributionsByCodeStackedBarModule,
  ],
  declarations: [
    ContributionsByCodeGQLComponent,
  ],  
  providers: [ ContributionsByCodeGQL ], 
  exports: [ ContributionsByCodeGQLComponent ],
  bootstrap: []
})
export class ContributionsByCodeGQLModule { }
