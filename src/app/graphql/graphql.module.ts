import { NgModule, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { provideApollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { environment } from 'src/environments/environment';
import { cache } from './cache';

const uri = `${environment.apiUrl}/graphql`;

@NgModule({
  imports: [CommonModule, HttpClientModule],
  declarations: [  ],
  providers: [
    provideApollo(() => {
      const httpLink = inject(HttpLink);

      return {
        cache: cache,
        link: httpLink.create({
          uri: uri,
        }),
      };
    }),
  ],
  exports: [],
  bootstrap: []
})
export class GraphQLModule { }
