// import { Meta, Story } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';

import { TotalRaisedBarComponent } from './total-raised-bar.component';

import { NgxEchartsModule } from 'ngx-echarts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export default {
  title: 'Lib-ui-charts/Total Raised Bar',
  component: TotalRaisedBarComponent,
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
    raisedCategories: [
      { value: 10000, color: '#00e25f', name: 'In Kind',},
      { value: 60000, color: '#00b24b', name: 'Democracy Dollars',},
      { value: 80000, color: '#007e35', name: 'Individual',},
    ]
  },
});

export const ByMonetaryType = () => ({
  props: {
    raisedCategories: [
      { value: 10000, color: '#00e25f', name: 'Monetary',},
      { value: 30000, color: '#00b24b', name: 'Non-Monetary',},
      { value: 60000, color: '#007e35', name: 'Democracy Dollars',},
    ]
  },
});

export const ByContributorCode = () => ({
  props: {
    raisedCategories: [
      { value: 10000, color: '#00e25f', code: 'IND', name: 'Individual' },
      { value: 20000, color: '#00b24b', code: 'COM', name: 'Recipient Committee (other than PTY or SCC)' },
      { value: 30000, color: '#00b24b', code: 'OTH', name: 'Other (e.g., business entity)' },
      { value: 40000, color: '#00b24b', code: 'PTY', name: 'Political Party' },
      { value: 50000, color: '#00b24b', code: 'SCC', name: 'Small Contributor Committee' },
    ]
  },
});
