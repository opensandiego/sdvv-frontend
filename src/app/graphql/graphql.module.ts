import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/core';
import { BrowserModule } from '@angular/platform-browser';

const local_dev_url = 'http://localhost:3000';
const remote_prod_url = 'https://opensandiego-voters-voice.herokuapp.com'
const uri = `${local_dev_url}/graphql`;

@NgModule({
  imports: [
    BrowserModule,
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
