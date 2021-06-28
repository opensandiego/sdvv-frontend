import { Meta, Story } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxEchartsModule } from 'ngx-echarts';

import { RaisedByOutsideMoneyBarComponent } from './raised-by-outside-money-bar.component';

export default {
  title: 'Charts/Raised by Outside Money (ECharts)',
  component: RaisedByOutsideMoneyBarComponent,
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
    raisedByOutsideMoney: { type: 'object' },
  },
} as Meta;

const Template: Story<RaisedByOutsideMoneyBarComponent> = (args: RaisedByOutsideMoneyBarComponent) => ({
  props: args,
})

export const Default = Template.bind({});
Default.args = {
  raisedByOutsideMoney: {
    inOpposition: 237890,
    inSupport: 63210,
  }
};

