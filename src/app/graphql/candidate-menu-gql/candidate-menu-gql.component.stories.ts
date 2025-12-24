import { applicationConfig, Meta, StoryObj } from '@storybook/angular';
import { GraphQLModule } from '../graphql.module';
import { importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';

import { CandidateMenuGQLComponent } from './candidate-menu-gql.component';

const meta: Meta<CandidateMenuGQLComponent> = {
  title: 'Lib-gql/Candidate Menu',
  component: CandidateMenuGQLComponent,
  decorators: [
    applicationConfig({
      providers: [importProvidersFrom(GraphQLModule), provideAnimations()],
    }),
  ],
};

export default meta;
type Story = StoryObj<CandidateMenuGQLComponent>;

export const Default: Story = {
  args: {},
};

export const Year2022: Story = {
  args: {
    electionYear: '2022',
  },
};

export const Year2022WithSelection: Story = {
  args: {
    electionYear: '2022',
    activeItem: {
      officeTitle: 'City Council',
      districtNumber: '4',
      candidateId: 'd5ca2f79-f6cd-40b8-9b26-d680bd932208|2022',
    },
  },
};

export const Year2020: Story = {
  args: {
    electionYear: '2020',
  },
};

export const Year2020DetailsActive: Story = {
  args: {
    detailsActive: true,
    electionYear: '2020',
  },
};

export const Year2020WithSelection: Story = {
  args: {
    activeItem: {
      officeTitle: 'Mayor',
      districtNumber: '',
      candidateId: '24738d25-2b55-4ef8-b78e-dcc4442a6327|2020',
    },
    detailsActive: true,
    electionYear: '2020',
  },
};

export const Year2018: Story = {
  args: {
    electionYear: '2018',
  },
};
