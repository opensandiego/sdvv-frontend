import { Meta, StoryObj } from '@storybook/angular';

import { CandidateDetailsHeaderComponent } from './candidate-details-header.component';

const meta: Meta<CandidateDetailsHeaderComponent> = {
  title: 'Lib UI Components/Candidate Details Header',
  component: CandidateDetailsHeaderComponent,
};

export default meta;
type Story = StoryObj<CandidateDetailsHeaderComponent>;

export const Default: Story = {
  args: {},
};

export const Sample1: Story = {
  args: {
    imageUrl: null,
    candidateName: 'John Jones',
    description: 'Former Fire Fighter and Active Reservist',
    website: 'https://www.google.com/',

    raised: 123456,
    donors: 6789,
    averageDonation: 345,
  },
};

export const Sample2: Story = {
  args: {
    candidateName: 'John Jones II',

    raised: 9876543,
    donors: 20876,
    averageDonation: 100,
  },
};
