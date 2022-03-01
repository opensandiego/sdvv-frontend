import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/core';
import { CommonModule } from '@angular/common';
import { environment } from 'src/environments/environment';

const uri = `${environment.apiUrl}/graphql`;

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ApolloModule,
  ],  
  declarations: [  ],  
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink) => {
        return {
          cache: new InMemoryCache(),
          link: httpLink.create({
            uri: uri,
          }),
        };
      },
      deps: [HttpLink],
    },
  ], 
  exports: [],
  bootstrap: []
})
export class GraphQLModule { }
