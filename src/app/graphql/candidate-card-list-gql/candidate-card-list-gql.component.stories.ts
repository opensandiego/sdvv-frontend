import { applicationConfig, moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { GraphQLModule } from '../graphql.module';
import { importProvidersFrom } from '@angular/core';

import { CandidateCardListGQLComponent } from './candidate-card-list-gql.component';
import { CandidateCardListGQLModule } from './candidate-card-list-gql.module';

export default {
  title: 'Lib-gql/Candidate Card List',
  component: CandidateCardListGQLComponent,
  decorators: [
    applicationConfig({
      providers: [importProvidersFrom(GraphQLModule)],
    }),
    moduleMetadata({
      declarations: [],
      imports: [
        CommonModule,
        CandidateCardListGQLModule,
      ],
      providers: [],
    }),
  ],
};

export const Default = () => ({
})

export const Year2020 = () => ({
  props: {
    year: '2020',
  },
})

export const Year2020Mayor = () => ({
  props: {
    year: '2020',
    office: 'Mayor',
  },
})

export const Year2020CityAttorney = () => ({
  props: {
    year: '2020',
    office: 'City Attorney',
  },
})

export const Year2020CityCouncil = () => ({
  props: {
    year: '2020',
    office: 'City Council',
  },
})

export const Year2020CityCouncilDist1 = () => ({
  props: {
    year: '2020',
    office: 'City Council',
    district: '1',
  },
})

export const Year2020CityCouncilDist3 = () => ({
  props: {
    year: '2020',
    office: 'City Council',
    district: '3',
  },
})
