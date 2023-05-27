// import { Meta, Story } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';

import { CandidateCardListGQLComponent } from './candidate-card-list-gql.component';
import { CandidateCardListGQLModule } from './candidate-card-list-gql.module';


export default {
  title: 'Lib-gql/Candidate Card List',
  component: CandidateCardListGQLComponent,
  decorators: [
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
