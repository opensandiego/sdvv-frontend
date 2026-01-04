import { NgModule } from '@angular/core';

import { GraphQLModule } from '../graphql.module';
import { OfficeCardGQLComponent } from './office-card-gql.component';

@NgModule({
  bootstrap: [],
  imports: [GraphQLModule, OfficeCardGQLComponent],
  declarations: [],
  exports: [OfficeCardGQLComponent],
})
export class OfficeCardGQLModule {}
