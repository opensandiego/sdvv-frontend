import { applicationConfig, Meta, StoryObj } from '@storybook/angular';
import { importProvidersFrom } from '@angular/core';

import { TotalIndependentExpendituresGQLComponent } from './total-expenditures-gql.component';
import { GraphQLModule } from '../../graphql.module';

const meta: Meta<TotalIndependentExpendituresGQLComponent> = {
  title: 'Lib-gql/Total Independent Expenditures',
  component: TotalIndependentExpendituresGQLComponent,
  decorators: [
    applicationConfig({
      providers: [importProvidersFrom(GraphQLModule)],
    }),
  ],
  globals: {
    backgrounds: { value: 'dark' },
  },
};

export default meta;
type Story = StoryObj<TotalIndependentExpendituresGQLComponent>;

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
