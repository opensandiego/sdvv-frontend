import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { GraphQLModule } from '../graphql.module';
import { FooterGQLComponent } from './footer.component';

@NgModule({
  declarations: [
    FooterGQLComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    GraphQLModule,
  ],
  exports: [
    FooterGQLComponent,
  ],
  providers: [],
})
export class FooterGQLModule { }
