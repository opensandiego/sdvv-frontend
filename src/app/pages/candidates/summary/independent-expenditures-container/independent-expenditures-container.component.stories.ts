import { Meta, applicationConfig, StoryObj } from '@storybook/angular';
import { importProvidersFrom } from '@angular/core';

import { IndependentExpendituresContainerComponent } from './independent-expenditures-container.component';
import { GraphQLModule } from 'src/app/graphql/graphql.module';

const meta: Meta<IndependentExpendituresContainerComponent> = {
  title: 'Lib-containers/Independent Expenditures',
  component: IndependentExpendituresContainerComponent,
  decorators: [
    applicationConfig({
      providers: [importProvidersFrom(GraphQLModule)],
    }),
  ],
};

export default meta;
type Story = StoryObj<IndependentExpendituresContainerComponent>;

export const Default: Story = {
  args: {
    candidateId: ''
  },
};

export const BarbaraBry2020: Story = {
  args: {
    candidateId: 'be0a57fb-c0f0-bbd5-0d42-44a6560cbd21|2020'
  },
};

export const ToddGloria2020: Story = {
  args: {
    candidateId: '24738d25-2b55-4ef8-b78e-dcc4442a6327|2020'
  },
};

