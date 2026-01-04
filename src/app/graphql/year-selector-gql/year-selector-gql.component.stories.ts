import { Meta, applicationConfig, StoryObj } from '@storybook/angular';
import { importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';

import { YearSelectorGQLComponent } from './year-selector-gql.component';
import { GraphQLModule } from '../graphql.module';

const meta: Meta<YearSelectorGQLComponent> = {
  title: 'Lib-gql/Election Years',
  component: YearSelectorGQLComponent,
  decorators: [
    applicationConfig({
      providers: [provideAnimations(), importProvidersFrom(GraphQLModule)],
    }),
  ],
};

export default meta;
type Story = StoryObj<YearSelectorGQLComponent>;

export const Default: Story = {
  args: {},
};

export const EmptyStringSelectedYear: Story = {
  args: {
    year: '',
  },
};

export const SelectedYear2022: Story = {
  args: {
    year: '2022',
  },
};

export const SelectedYear2020: Story = {
  args: {
    year: '2020',
  },
};

export const SelectedYearNotValid: Story = {
  args: {
    year: 'ABCD',
  },
};
