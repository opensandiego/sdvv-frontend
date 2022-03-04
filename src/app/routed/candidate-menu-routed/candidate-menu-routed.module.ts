import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { APIStoreModule } from '../../store/api.store.module';
import { CandidateMenuGQLModule } from 'src/app/graphql/candidate-menu/candidate-menu-gql.module';
import { CandidateMenuRoutedComponent } from './candidate-menu-routed.component';

@NgModule({
  declarations: [
    CandidateMenuRoutedComponent,
  ],
  imports: [
    CommonModule,
    APIStoreModule,
    CandidateMenuGQLModule
  ],
  exports: [
    CandidateMenuRoutedComponent,
  ],
  providers: [],
})
export class CandidateMenuRoutedModule { }
