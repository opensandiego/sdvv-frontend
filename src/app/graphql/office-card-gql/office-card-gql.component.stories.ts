import { applicationConfig, Meta, StoryObj } from '@storybook/angular';

import { OfficeCardGQLComponent } from './office-card-gql.component';
import { importProvidersFrom } from '@angular/core';
import { GraphQLModule } from '../graphql.module';

const meta: Meta<OfficeCardGQLComponent> = {
  title: 'Lib-gql/Office Card',
  component: OfficeCardGQLComponent,
  decorators: [
    applicationConfig({
      providers: [importProvidersFrom(GraphQLModule)],
    }),
  ],
};

export default meta;
type Story = StoryObj<OfficeCardGQLComponent>;

export const Default: Story = {
  args: {},
};

export const Mayor2022: Story = {
  args: {
    year: '2022',
    officeTitle: 'Mayor',
  },
};

export const CityCouncil2022: Story = {
  args: {
    year: '2022',
    officeTitle: 'City Council',
  },
};

export const Mayor2020: Story = {
  args: {
    year: '2020',
    officeTitle: 'Mayor',
  },
};

export const CityAttorney2020: Story = {
  args: {
    year: '2020',
    officeTitle: 'City Attorney',
  },
};

export const CityCouncil2020: Story = {
  args: {
    year: '2020',
    officeTitle: 'City Council',
  },
};
