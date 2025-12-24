import { applicationConfig, Meta, StoryObj } from '@storybook/angular';
import { provideAnimations } from '@angular/platform-browser/animations';

import { DetailsTabTitleComponent } from './details-tab-title.component';

const meta: Meta<DetailsTabTitleComponent> = {
  title: 'Lib UI Components/Details Tab Title',
  component: DetailsTabTitleComponent,
  decorators: [
    applicationConfig({
      providers: [provideAnimations()],
    }),
  ],
  argTypes: {},
};

export default meta;
type Story = StoryObj<DetailsTabTitleComponent>;

export const Default: Story = {
  args: {},
};

export const SampleText: Story = {
  args: {
    smallTitleText: 'Tab Small Title',
    largeTitleText: 'Tab Large Title',
    tooltipText: 'Placeholder tooltip text.',
  },
};

export const ByIndustry: Story = {
  args: {
    smallTitleText: 'Amount Raised',
    largeTitleText: 'By Industry',
    tooltipText: 'Placeholder tooltip text.',
  },
};

export const ByLocation: Story = {
  args: {
    smallTitleText: 'Amount Raised',
    largeTitleText: 'By Location',
    tooltipText: 'Placeholder tooltip text.',
  },
};

export const OutsideMoney: Story = {
  args: {
    smallTitleText: 'Amount Raised',
    largeTitleText: 'Outside Money',
    tooltipText: 'Placeholder tooltip text.',
  },
};

export const Nulls: Story = {
  args: {
    smallTitleText: null,
    largeTitleText: null,
    tooltipText: null,
  },
};
