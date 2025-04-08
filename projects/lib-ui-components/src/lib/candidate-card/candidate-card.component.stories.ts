import { Meta, StoryObj } from '@storybook/angular';

import { CandidateCardComponent } from './candidate-card.component';

const meta: Meta<CandidateCardComponent> = {
  title: 'Lib UI Components/Candidate Card',
  component: CandidateCardComponent,
};

export default meta;
type Story = StoryObj<CandidateCardComponent>;

export const Default: Story = {
  args: {
    candidateInfo: {
      id: 'id1',
      firstName: 'First Name',
      lastName: 'Last Name',
      fullName: 'Full Name',
    },
    committeeData: {
      raised: 54321,
      donors: 12345,
    },
    inExpandedCard: true,
  },
};

export const Name1: Story = {
  args: {
    candidateInfo: {
      id: 'id2',
      firstName: 'One Name',
      lastName: 'One Last Name',
      fullName: 'A Full Name',
      description: 'Somewhat long description with multiple titles',
    },
    committeeData: {
      raised: 98765,
      donors: 5432,
    },
    inExpandedCard: true,
  },
};
