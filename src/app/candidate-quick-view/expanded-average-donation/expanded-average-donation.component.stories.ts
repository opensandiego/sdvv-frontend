import { Meta, Story } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';

import { ExpandedAverageDonationComponent } from './expanded-average-donation.component';

export default {
  title: 'Quick View/Average Donation',
  component: ExpandedAverageDonationComponent,
  decorators: [
    moduleMetadata({
      declarations: [
      ],
      imports: [
      ],
      providers: [],
    }),
  ],  
  argTypes: {
  },
} as Meta;

const Template: Story<ExpandedAverageDonationComponent> = (args: ExpandedAverageDonationComponent) => ({
  props: args,
})

export const Default = Template.bind({});
Default.args = {
  amount: 333,
};
