import { Meta, Story } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';

import { OutsideSpendingBarComponent } from './outside-spending-bar.component';

import { NgxEchartsModule } from 'ngx-echarts';

export default {
  title: 'ECharts/Outside Spending Bar',
  component: OutsideSpendingBarComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [
        NgxEchartsModule.forRoot({
          echarts: () => import('echarts'),
        }),
      ],
      providers: [],
    }),
  ], 
  argTypes: {
    raisedCategories: { type: 'array'}
  },
} as Meta;

const Template: Story<OutsideSpendingBarComponent> = (args: OutsideSpendingBarComponent) => ({
  props: args,
})

export const Default = Template.bind({});
Default.args = {
  support: 200123,
  oppose: 5432,
  backgroundColor: 'black',
  textColor: 'white',
};

export const DefaultColors = Template.bind({});
DefaultColors.args = {
  support: 200123,
  oppose: 5432,
};

export const GreyBackgroundWhiteText = Template.bind({});
GreyBackgroundWhiteText.args = {
  support: 200123,
  oppose: 5432,
  backgroundColor: 'grey',
  textColor: 'white',
};

export const GreenText = Template.bind({});
GreenText.args = {
  support: 200123,
  oppose: 5432,
  textColor: 'green',
};
