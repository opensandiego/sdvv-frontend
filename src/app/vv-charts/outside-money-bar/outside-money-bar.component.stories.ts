import { Meta, Story } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';

import { OutsideMoneyBarComponent } from './outside-money-bar.component';
import { RoundCurrencyPipe } from '../round-currency.pipe';

import { ChartsModule } from 'ng2-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTooltipModule } from '@angular/material/tooltip';

export default {
  title: 'Charts/Outside Money',
  component: OutsideMoneyBarComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [BrowserAnimationsModule, ChartsModule, MatTooltipModule],
      providers: [RoundCurrencyPipe],
    }),
  ], 
  argTypes: {
    support: { type: 'number' },
    oppose: { type: 'number' },
  },
} as Meta;

const Template: Story<OutsideMoneyBarComponent> = (args: OutsideMoneyBarComponent) => ({
  props: args,
})

export const SupportHigher = Template.bind({});
SupportHigher.args = {
  support: 600000,
  oppose: 200000,
};

export const OpposeHigher = Template.bind({});
OpposeHigher.args = {
  support: 220000,
  oppose: 590000,
};

export const Equal = Template.bind({});
Equal.args = {
  support: 200000,
  oppose: 200000,
};

export const BothLow = Template.bind({});
BothLow.args = {
  support: 2200,
  oppose: 1900,
};

export const BothHigh = Template.bind({});
BothHigh.args = {
  support: 700000,
  oppose: 650000,
};

export const BothExtremeHigh = Template.bind({});
BothExtremeHigh.args = {
  support: 900000,
  oppose: 850000,
};

export const ExtremeUnbalanced = Template.bind({});
ExtremeUnbalanced.args = {
  support: 1000,
  oppose: 800000,
};

export const SupportAt9M = Template.bind({});
SupportAt9M.args = {
  support: 9000000,
  oppose: 4000000,
};
