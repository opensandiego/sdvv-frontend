import { NgModule, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { provideApollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { environment } from 'src/environments/environment';
import { cache } from './cache';

const uri = `${environment.apiUrl}/graphql`;

@NgModule({
  declarations: [],
  exports: [],
  bootstrap: [],
  imports: [CommonModule],
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
    provideHttpClient(withInterceptorsFromDi()),
  ],
})
export class GraphQLModule {}
