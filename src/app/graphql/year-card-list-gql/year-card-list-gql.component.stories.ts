import { applicationConfig, Meta, StoryObj } from '@storybook/angular';
import { importProvidersFrom } from '@angular/core';

import { YearCardListGQLComponent } from './year-card-list-gql.component';
import { GraphQLModule } from '../graphql.module';

const meta: Meta<YearCardListGQLComponent> = {
  title: 'Lib-gql/Year Card List',
  component: YearCardListGQLComponent,
  decorators: [
    applicationConfig({
      providers: [importProvidersFrom(GraphQLModule)],
    }),
  ],
};

export default meta;
type Story = StoryObj<YearCardListGQLComponent>;

export const Default: Story = {
  args: {},
};
