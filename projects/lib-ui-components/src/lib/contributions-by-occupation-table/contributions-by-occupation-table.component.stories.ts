import { Meta, StoryObj } from '@storybook/angular';
import { ContributionsByOccupationTableComponent } from './contributions-by-occupation-table.component';

const meta: Meta<ContributionsByOccupationTableComponent> = {
  title: 'Lib UI Components/Contributions by Occupation',
  component: ContributionsByOccupationTableComponent,
};

export default meta;
type Story = StoryObj<ContributionsByOccupationTableComponent>;

export const Default: Story = {
  args: {
    contributionGroups: [
      { name: 'Technology', amount: 500000, percent: 50 },
      { name: 'Finance', amount: 200000, percent: 20 },
      { name: 'Energy', amount: 150000, percent: 15 },
    ],
  },
};

export const FiveGroups: Story = {
  args: {
    contributionGroups: [
      { name: 'Technology', amount: 500000, percent: 50 },
      { name: 'Finance', amount: 200000, percent: 20 },
      { name: 'Energy', amount: 150000, percent: 15 },
      { name: 'Construction', amount: 100000, percent: 10 },
      { name: 'Other', amount: 50000, percent: 5 },
    ],
  },
};

export const OneGroups: Story = {
  args: {
    contributionGroups: [{ name: 'Politics', amount: 123456, percent: 78 }],
  },
};

export const ZeroGroups: Story = {
  args: {
    contributionGroups: [],
  },
};

export const NoGroups: Story = {
  args: {},
};
