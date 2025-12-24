import { Meta, applicationConfig, StoryObj } from '@storybook/angular';

import { YearCardGQLComponent } from './year-card-gql.component';
import { importProvidersFrom } from '@angular/core';
import { GraphQLModule } from '../graphql.module';

const meta: Meta<YearCardGQLComponent> = {
  title: 'Lib-gql/Year Card',
  component: YearCardGQLComponent,
  decorators: [
    applicationConfig({
      providers: [importProvidersFrom(GraphQLModule)],
    }),
  ],
};

export default meta;
type Story = StoryObj<YearCardGQLComponent>;

export const Default: Story = {
  args: {},
};

export const EmptyStringSelectedYear: Story = {
  args: {
    year: '',
  },
};

export const Year2022: Story = {
  args: {
    year: '2022',
  },
};

export const Year2020: Story = {
  args: {
    year: '2020',
  },
};

export const Year2018: Story = {
  args: {
    year: '2018',
  },
};

export const Year2016: Story = {
  args: {
    year: '2016',
  },
};

export const Year2014: Story = {
  args: {
    year: '2014',
  },
};

export const SelectedYearNotValid: Story = {
  args: {
    year: 'ABCD',
  },
};
