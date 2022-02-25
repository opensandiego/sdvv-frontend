import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { APIStoreModule } from '../../store/api.store.module';
import { CandidateMenuGQLModule } from 'src/app/graphql/candidate-menu/candidate-menu-gql.module';
import { CandidateMenuRouteComponent } from './candidate-menu-routed.component';

@NgModule({
  declarations: [
    CandidateMenuRouteComponent,
  ],
  imports: [
    CommonModule,
    APIStoreModule,
    CandidateMenuGQLModule
  ],
  exports: [
    CandidateMenuRouteComponent,
  ],
  providers: [],
})
export class CandidateMenuRoutedModule { }
