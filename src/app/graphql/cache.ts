import { InMemoryCache, makeVar } from "@apollo/client";

export const electionYearVar = makeVar('');

export const cache = new InMemoryCache({
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
    Expenses: {
      merge: true,
    },
    IndependentExpenditures: {
      merge: true,
    },
    Query: {
      fields: {
        electionYear: {
          read() {
            return electionYearVar();
          },
        }
      },
    },
  },
});
