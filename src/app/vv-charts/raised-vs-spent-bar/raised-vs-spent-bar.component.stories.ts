import { Meta, Story } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';

import { NgxEchartsModule } from 'ngx-echarts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RaisedVsSpentBarComponent } from './raised-vs-spent-bar.component';

export default {
  title: 'ECharts/Raised vs Spent Bar',
  component: RaisedVsSpentBarComponent,
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
} as Meta;

const Template: Story<RaisedVsSpentBarComponent> = (args: RaisedVsSpentBarComponent) => ({
  props: args,
})

export const Default = Template.bind({});
Default.args = {
  raised: 150000,
  spent: 125000,
};
