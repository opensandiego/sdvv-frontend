import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CandidateMenuGQLModule } from 'src/app/graphql/candidate-menu-gql/candidate-menu-gql.module';
import { CandidateMenuRoutedComponent } from './candidate-menu-routed.component';

@NgModule({
  declarations: [
    CandidateMenuRoutedComponent,
  ],
  imports: [
    CommonModule,
    CandidateMenuGQLModule
  ],
  exports: [
    CandidateMenuRoutedComponent,
  ],
  providers: [],
})
export class CandidateMenuRoutedModule { }
