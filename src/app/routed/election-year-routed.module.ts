import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { APIStoreModule } from '../store/api.store.module';
import { YearSelectorGQLModule } from '../graphql/year-selector-gql/year-selector-gql.module';
import { ElectionYearRouteComponent } from './election-year-routed.component';

@NgModule({
  declarations: [
    ElectionYearRouteComponent,
  ],
  imports: [
    CommonModule,
    APIStoreModule,
    YearSelectorGQLModule,
  ],
  exports: [
    ElectionYearRouteComponent,
  ],
  providers: [],
})
export class ElectionYearRoutedModule { }
