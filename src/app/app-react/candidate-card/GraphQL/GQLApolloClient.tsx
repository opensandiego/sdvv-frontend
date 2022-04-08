import * as React from 'react';
import { FunctionComponent } from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import { environment } from 'src/environments/environment';

const uri = `${environment.apiUrl}/graphql`;

const cacheOptions = {
  typePolicies: {
    Committee: {
      keyFields: ["name"],
    },
    Office: {
      keyFields: ["title", "electionYear"],
    },
    ContributionDetails: {
      merge: true,
    },
  }
};

export const GQLApolloClient: FunctionComponent = (props) => {
  const client = new ApolloClient({
    cache: new InMemoryCache(cacheOptions),
    uri: uri,
  });

  return (
    <div>
      <ApolloProvider client={client}>
        {props.children}
      </ApolloProvider>
    </div>
  );
}
