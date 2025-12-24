import { Meta, StoryObj } from '@storybook/angular';

import { AverageDonationComponent } from './average-donation.component';

const meta: Meta<AverageDonationComponent> = {
  title: 'Lib UI Components/Average Donation',
  component: AverageDonationComponent,
};

export default meta;
type Story = StoryObj<AverageDonationComponent>;

export const Default: Story = {
  args: {
    average: 333,
  },
};
