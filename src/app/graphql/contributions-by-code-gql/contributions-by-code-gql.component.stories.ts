import { applicationConfig, Meta, StoryObj } from '@storybook/angular';
import { importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';

import { GraphQLModule } from '../graphql.module';
import { ContributionsByCodeGQLComponent } from './contributions-by-code-gql.component';

const meta: Meta<ContributionsByCodeGQLComponent> = {
  title: 'Lib-gql/Contributions by code',
  component: ContributionsByCodeGQLComponent,
  decorators: [
    applicationConfig({
      providers: [importProvidersFrom(GraphQLModule), provideAnimations()],
    }),
  ],
};

export default meta;
type Story = StoryObj<ContributionsByCodeGQLComponent>;

export const Default: Story = {
  args: {
    candidateId: '',
  },
};

export const NoArgs: Story = {};

export const BarbaraBry2020: Story = {
  args: {
    candidateId: 'be0a57fb-c0f0-bbd5-0d42-44a6560cbd21|2020',
  },
};

export const ToddGloria2020: Story = {
  args: {
    candidateId: '24738d25-2b55-4ef8-b78e-dcc4442a6327|2020',
  },
};

export const StephenWhitburn2020: Story = {
  args: {
    candidateId: 'be577485-059c-44c0-94ed-a1678106f3f0|2020',
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
