import { Meta, Story } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';

import { TotalSpentDonutComponent } from './total-spent-donut.component';
import { RoundCurrencyPipe } from '../round-currency.pipe'; // component dependency

import { NgxEchartsModule } from 'ngx-echarts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTooltipModule } from '@angular/material/tooltip';

export default {
  title: 'Charts/Total Spent (ECharts)',
  component: TotalSpentDonutComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [
        BrowserAnimationsModule, 
        MatTooltipModule,
        NgxEchartsModule.forRoot({
          echarts: () => import('echarts'),
        }),
      ],
      providers: [RoundCurrencyPipe],
    }),
  ], 
  argTypes: {
    spendingCategories: { type: 'array'}
  },
} as Meta;

const Template: Story<TotalSpentDonutComponent> = (args: TotalSpentDonutComponent) => ({
  props: args,
})

export const Default = Template.bind({});
Default.args = {
  spendingCategories: [
    { name: 'Expenditure A', value: 2000, },
    { name: 'Expenditure B', value: 3000, },
    { name: 'Expenditure C', value: 4000, },
    { name: 'Expenditure D', value: 5000, },
    { name: 'Expenditure E', value: 6000, },
  ]
};

export const Sample1 = Template.bind({});
Sample1.args = {
  spendingCategories: [
    { name: 'Expenditure text', value: 1000, },
    { name: 'Expenditure with more text', value: 9000, },
    { name: 'Expenditure with even more text', value: 30000, },
    { name: 'Expenditure with yet some more text', value: 40000, },
    { name: 'Expenditure 50', value: 50000, },
    { name: 'Expenditure 60', value: 60000, },
  ]
};

export const Sample2 = Template.bind({});
Sample2.args = {
  spendingCategories: [
    { name: 'Books',          value: 200},
    { name: 'Salaries',       value: 20000},
    { name: 'Marketing',      value: 1000},
    { name: 'Lots of Stuff',  value: 7000},
    { name: 'More Stuff',     value: 5000},
    { name: 'Stuff',          value: 130},
    { name: 'Other',          value: 1200},
  ]
};

