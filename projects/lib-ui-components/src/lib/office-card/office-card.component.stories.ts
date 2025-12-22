import { Meta, StoryObj } from '@storybook/angular';

import { OfficeCardComponent } from './office-card.component';

const meta: Meta<OfficeCardComponent> = {
  title: 'Lib UI Components/Office Card',
  component: OfficeCardComponent,
};

export default meta;
type Story = StoryObj<OfficeCardComponent>;

export const Default: Story = {
  args: {},
};

export const Mayor: Story = {
  args: {
    officeInfo: {
      officeTitle: 'Mayor',
      candidateCount: 12,
    },
    officeData: {
      totalContributions: 12345,
    },
  },
};

export const CityCouncil: Story = {
  args: {
    officeInfo: {
      officeTitle: 'City Council',
      candidateCount: 14,
    },
    officeData: {
      totalContributions: 98765,
    },
  },
};

export const CityAttorney: Story = {
  args: {
    officeInfo: {
      officeTitle: 'City Attorney',
      candidateCount: 4,
    },
    officeData: {
      totalContributions: 876,
    },
  },
};

export const NoOfficeName: Story = {
  args: {
    officeInfo: {
      officeTitle: '',
      candidateCount: 0,
    },
    officeData: {
      totalContributions: 0,
    },
  },
};
