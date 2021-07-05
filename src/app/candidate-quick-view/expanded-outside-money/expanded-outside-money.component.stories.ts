import { Meta, Story } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';
import { MatTooltipModule } from '@angular/material/tooltip';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxEchartsModule } from 'ngx-echarts';

import { ExpandedOutsideMoneyComponent } from './expanded-outside-money.component';

import { ExpandedChartTitleComponent } from '../expanded-chart-title/expanded-chart-title.component';
import { OutsideSpendingBarComponent } from '../../vv-charts/outside-spending-bar/outside-spending-bar.component';


export default {
  title: 'Expanded/Outside Money',
  component: ExpandedOutsideMoneyComponent,
  decorators: [
    moduleMetadata({
      declarations: [
        OutsideSpendingBarComponent,
        ExpandedChartTitleComponent,
      ],
      imports: [        
        BrowserAnimationsModule,
        FontAwesomeModule,
        MatTooltipModule,
        NgxEchartsModule.forRoot({
          echarts: () => import('echarts'),
        }),
      ],
      providers: [],
    }),
  ], 
  argTypes: {  },
} as Meta;

const Template: Story<ExpandedOutsideMoneyComponent> = (args: ExpandedOutsideMoneyComponent) => ({
  props: args,
});

export const Default = Template.bind({});
Default.args = {
  support: 200000,
  oppose: 5000,
  totalExpenditures: 150000,
};
