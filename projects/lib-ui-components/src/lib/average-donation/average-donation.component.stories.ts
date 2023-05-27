// import { Meta, Story } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';

import { AverageDonationComponent } from './average-donation.component';

export default {
  title: 'Lib UI Components/Average Donation',
  component: AverageDonationComponent,
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
};

const Template = (args: AverageDonationComponent) => ({
  props: args,
})

export const Default = Template.bind({});
Default.args = {
  amount: 333,
};
