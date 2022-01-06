import { Meta, Story } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';

import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { ExpandedRaisedInVsOutComponent } from './expanded-raised-in-vs-out.component';
import { ExpandedChartTitleComponent } from './../expanded-chart-title/expanded-chart-title.component';

import { VvChartsModule } from '../../vv-charts/vv-charts.module';


export default {
  title: 'Quick View/Raised In vs Out',
  component: ExpandedRaisedInVsOutComponent,
  decorators: [
    moduleMetadata({
      declarations: [ 
        ExpandedChartTitleComponent
      ],
      imports: [
        BrowserAnimationsModule,
        FontAwesomeModule,
        MatTooltipModule,
        VvChartsModule,
      ],
      providers: [],
    }),
  ],  
  argTypes: {
  },
} as Meta;

const Template: Story<ExpandedRaisedInVsOutComponent> = (args: ExpandedRaisedInVsOutComponent) => ({
  props: args,
})

export const Default = Template.bind({});
Default.args = {
  inside: 5000,
  outside: 1000,
  areaName: 'City of San Diego',
  jurisdiction: 'City',
  jurisdictionSuffix: '',
};
