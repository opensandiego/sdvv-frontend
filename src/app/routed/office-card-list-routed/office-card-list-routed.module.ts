import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { OfficeCardListRoutedComponent } from './office-card-list-routed.component';
import { OfficeCardGQLModule } from 'src/app/graphql/office-card-gql/office-card-gql.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    OfficeCardGQLModule,
  ],
  declarations: [
    OfficeCardListRoutedComponent,
  ],  
  providers: [ ], 
  exports: [ OfficeCardListRoutedComponent ],
  bootstrap: []
})
export class OfficeCardListRoutedModule { }
