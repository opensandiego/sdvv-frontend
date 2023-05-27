// import { Meta, Story } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxEchartsModule } from 'ngx-echarts';

import { OutsideMoneyStackedBarComponent } from './outside-money-stacked-bar.component';

export default {
  title: 'Lib-ui-charts/Outside Money Stacked Bar',
  component: OutsideMoneyStackedBarComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [
        BrowserAnimationsModule, 
        NgxEchartsModule.forRoot({
          echarts: () => import('echarts'),
        }),
      ],
      providers: [],
    }),
  ], 
};

export const Default = () => ({
  props: {
    opposedCommittees: [
      {
        id: '0',
        name: 'Expenditure Committee A',
        value: 22321,
        percent: 20.8,
      },
      {
        id: '1',
        name: 'Expenditure Committee B',
        value: 11987,
        percent: 17,
      },
      {
        id: '2',
        name: 'Expenditure Committee C',
        value: 10345,
        percent: 8,
      },
      {
        id: '3',
        name: 'Expenditure Committee D',
        value: 7876,
        percent: 3,
      },
      {
        id: '4',
        name: 'Other',
        value: 3654,
        percent: 2,
      },
    ],
    supportCommittees: [
      {
        id: '5',
        name: 'Support Committee E',
        value: 26321,
        percent: 20.8,
      },
      {
        id: '6',
        name: 'Support Committee F',
        value: 19876,
        percent: 17,
      },
      {
        id: '7',
        name: 'Support Committee G',
        value: 12345,
        percent: 8,
      },
      {
        id: '8',
        name: 'Support Committee H',
        value: 9876,
        percent: 3,
      },
      {
        id: '9',
        name: 'Other',
        value: 7654,
        percent: 2,
      },
    ],
  },
});
