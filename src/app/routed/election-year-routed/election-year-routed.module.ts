import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YearSelectorGQLModule } from '../../graphql/year-selector-gql/year-selector-gql.module';
import { ElectionYearRouteComponent } from './election-year-routed.component';

@NgModule({
  declarations: [
    ElectionYearRouteComponent,
  ],
  imports: [
    CommonModule,
    YearSelectorGQLModule,
  ],
  exports: [
    ElectionYearRouteComponent,
  ],
  providers: [],
})
export class ElectionYearRoutedModule { }
