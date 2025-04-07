import { Meta, applicationConfig, StoryObj } from '@storybook/angular';
import { importProvidersFrom } from '@angular/core';

import { GraphQLModule } from 'src/app/graphql/graphql.module';
import { DetailsContributionsByOccupationGQLComponent } from './details-contributions-by-occupation-gql.component';

const meta: Meta<DetailsContributionsByOccupationGQLComponent> = {
  title: 'Lib-gql/Details Contributions by Occupation',
  component: DetailsContributionsByOccupationGQLComponent,
  decorators: [
    applicationConfig({
      providers: [importProvidersFrom(GraphQLModule)],
    }),
  ],
  argTypes: {},
};

export default meta;
type Story = StoryObj<DetailsContributionsByOccupationGQLComponent>;

export const Default: Story = {
  args: {},
};

export const Empty: Story = {
  args: {
    candidateId: '',
  },
};

export const BarbaraBry2020: Story = {
  args: {
    candidateId: 'be0a57fb-c0f0-bbd5-0d42-44a6560cbd21|2020',
  },
};

export const JenniferCampbell2022: Story = {
  args: {
    candidateId: 'd3d1c6e7-0add-49f1-9b3d-e9289e7efcf6|2022',
  },
};

export const MonicaMontgomerySteppe2022: Story = {
  args: {
    candidateId: '82cae978-49df-4a77-8793-0efffb7772b5|2022',
  },
};
