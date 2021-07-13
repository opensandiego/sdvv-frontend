import { Meta, Story } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';

import { ChartsModule } from 'ng2-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


import { RoundCurrencyPipe } from '../round-currency.pipe';

import { RaisedVsSpentComponent } from './raised-vs-spent.component';

export default {
  title: 'Chart-js/Raised vs Spent Bar',
  component: RaisedVsSpentComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [
        BrowserAnimationsModule, 
        MatTooltipModule,
        FontAwesomeModule,
        ChartsModule,
      ],
      providers: [RoundCurrencyPipe],
    }),
  ], 
  argTypes: {
  },
} as Meta;

const Template: Story<RaisedVsSpentComponent> = (args: RaisedVsSpentComponent) => ({
  props: args,
})

export const Default = Template.bind({});
Default.args = {
  raised: 150000,
  spent: 125000,
  averageDonation: 200,
};
