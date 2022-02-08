import { Meta, Story } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';

import { OutsideSpendingBarComponent } from './outside-spending-bar.component';

import { NgxEchartsModule } from 'ngx-echarts';

export default {
  title: 'Lib-ui-charts/Outside Spending Bar',
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
} as Meta;

export const Default: Story = () => ({
  props: {
    support: 200123,
    oppose: 5432,
    backgroundColor: 'black',
    textColor: 'white',
  },
});

export const DefaultColors: Story = () => ({
  props: {
    support: 200123,
    oppose: 5432,
  },
});

export const GreyBackgroundWhiteText: Story = () => ({
  props: {
    support: 200123,
    oppose: 5432,
    backgroundColor: 'grey',
    textColor: 'white',
  },
});

export const GreenText: Story = () => ({
  props: {
    support: 200123,
    oppose: 5432,
    textColor: 'green',
  },
});
