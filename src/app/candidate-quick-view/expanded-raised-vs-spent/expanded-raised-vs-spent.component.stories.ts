import { Meta, Story } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxEchartsModule } from 'ngx-echarts';

import { ExpandedRaisedVsSpentComponent } from './expanded-raised-vs-spent.component';

import { ExpandedChartTitleComponent } from '../expanded-chart-title/expanded-chart-title.component';
import { RaisedVsSpentBarComponent } from '../../vv-charts/raised-vs-spent-bar/raised-vs-spent-bar.component';
import { ExpandedAverageDonationComponent } from '../expanded-average-donation/expanded-average-donation.component';


export default {
  title: 'Expanded/Raised vs. Spent',
  component: ExpandedRaisedVsSpentComponent,
  decorators: [
    moduleMetadata({
      declarations: [
        ExpandedChartTitleComponent,
        RaisedVsSpentBarComponent,
        ExpandedAverageDonationComponent,
      ],
      imports: [
        BrowserAnimationsModule, 
        MatTooltipModule, 
        FontAwesomeModule,
        NgxEchartsModule.forRoot({
          echarts: () => import('echarts'),
        }),
      ],
      providers: [],
    }),
  ],  
  argTypes: {
  },
} as Meta;

const Template: Story<ExpandedRaisedVsSpentComponent> = (args: ExpandedRaisedVsSpentComponent) => ({
  props: args,
})

export const Default = Template.bind({});
Default.args = {
  raised: 250000,
  spent: 135000,
  averageDonation: 200,
};
