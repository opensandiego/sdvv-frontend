import { applicationConfig, Meta, StoryObj } from '@storybook/angular';
import { importProvidersFrom } from '@angular/core';

import { SupportOpposeBarGQLComponent } from './support-oppose-bar-gql.component';
import { GraphQLModule } from '../../graphql.module';

const meta: Meta<SupportOpposeBarGQLComponent> = {
  title: 'Lib-gql/Support Oppose Bar',
  component: SupportOpposeBarGQLComponent,
  decorators: [
    applicationConfig({
      providers: [importProvidersFrom(GraphQLModule)],
    }),
  ],
};

export default meta;
type Story = StoryObj<SupportOpposeBarGQLComponent>;

export const Default: Story = {
  args: {
    candidateId: '',
  },
};

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
