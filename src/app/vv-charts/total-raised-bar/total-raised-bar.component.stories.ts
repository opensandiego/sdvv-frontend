import { Meta, Story } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';

import { TotalRaisedBarComponent } from './total-raised-bar.component';

import { NgxEchartsModule } from 'ngx-echarts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export default {
  title: 'ECharts/Total Raised Bar',
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
  argTypes: {
    raisedCategories: { type: 'array'}
  },
} as Meta;


const Template: Story<TotalRaisedBarComponent> = (args: TotalRaisedBarComponent) => ({
  props: args,
})


export const Default = Template.bind({});
Default.args = {
  raisedCategories: [
    { value: 10000, color: '#00e25f', name: 'In Kind',},
    { value: 60000, color: '#00b24b', name: 'Democracy Dollars',},
    { value: 80000, color: '#007e35', name: 'Individual',},
  ]
};
