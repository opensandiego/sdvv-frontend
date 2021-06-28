import { Meta, Story } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxEchartsModule } from 'ngx-echarts';

import { RaisedByLocationBarComponent } from './raised-by-location-bar.component';

export default {
  title: 'Charts/Raised by Location (ECharts)',
  component: RaisedByLocationBarComponent,
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
    raisedByLocations: { type: 'array' },
  },
} as Meta;

const Template: Story<RaisedByLocationBarComponent> = (args: RaisedByLocationBarComponent) => ({
  props: args,
})

export const Default = Template.bind({});
Default.args = {
  raisedByLocations: {
    inDistrict: 18439,
    inCity: 24897,
    inCounty: 35123,
    inState: 37890,
    outState: 15123,
  }
};

