import { applicationConfig, Meta, StoryObj } from '@storybook/angular';
import { GraphQLModule } from '../graphql.module';
import { importProvidersFrom } from '@angular/core';

import { CandidateCardListGQLComponent } from './candidate-card-list-gql.component';

const meta: Meta<CandidateCardListGQLComponent> = {
  title: 'Lib-gql/Candidate Card List',
  component: CandidateCardListGQLComponent,
  decorators: [
    applicationConfig({
      providers: [importProvidersFrom(GraphQLModule)],
    }),
  ],
};

export default meta;
type Story = StoryObj<CandidateCardListGQLComponent>;

export const Default: Story = {};

export const Year2020: Story = {
  args: {
    year: '2020',
  },
};

export const Year2020Mayor: Story = {
  args: {
    year: '2020',
    office: 'Mayor',
  },
};

export const Year2020CityAttorney: Story = {
  args: {
    year: '2020',
    office: 'City Attorney',
  },
};

export const Year2020CityCouncil: Story = {
  args: {
    year: '2020',
    office: 'City Council',
  },
};

export const Year2020CityCouncilDist1: Story = {
  args: {
    year: '2020',
    office: 'City Council',
    district: '1',
  },
};

export const Year2020CityCouncilDist3: Story = {
  args: {
    year: '2020',
    office: 'City Council',
    district: '3',
  },
};
