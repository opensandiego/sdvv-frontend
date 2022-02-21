import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { GraphQLModule } from '../graphql.module';
import { ContributionsByCodeStackedBarModule } from 'projects/lib-ui-charts/src/lib/contributions-by-code-stacked-bar/contributions-by-code-stacked-bar.module';
import { ContributionsByCodeGQL } from './contributions-by-code-gql.query';
import { ContributionsByCodeGQLComponent } from './contributions-by-code-gql.component';

@NgModule({
  imports: [
    BrowserModule,
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
