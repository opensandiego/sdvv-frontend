import { Meta, Story } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';

import { RaisedInVsOutDonutComponent } from './raised-in-vs-out-donut.component';

import { VvChartsModule } from '../vv-charts.module';

export default {
  title: 'ECharts/Raised In vs. Out of Area Donut',
  component: RaisedInVsOutDonutComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [
        CommonModule,
        VvChartsModule,
      ],
      providers: [],
    }),
  ], 
  argTypes: {  },
} as Meta;

const Template: Story<RaisedInVsOutDonutComponent> = (args: RaisedInVsOutDonutComponent) => ({
  props: args,
})

export const Default = Template.bind({});
Default.args = {
  inside: 5000,
  outside: 1000,
};

export const LowOutsideFitOverLap1 = Template.bind({});
LowOutsideFitOverLap1.args = {
  inside: 10000,
  outside: 500,
};

export const LowOutsideFitOverLap2 = Template.bind({});
LowOutsideFitOverLap2.args = {
  inside: 10000,
  outside: 50,
};

export const MinimalOutsideFit1 = Template.bind({});
MinimalOutsideFit1.args = {
  inside: 10000,
  outside: 1500,
};

export const MinimalOutsideFit2 = Template.bind({});
MinimalOutsideFit2.args = {
  inside: 1000,
  outside: 100,
};

export const EqualInAndOut = Template.bind({});
EqualInAndOut.args = {
  inside: 1234,
  outside: 1234,
};

export const HighInsideLowOutside = Template.bind({});
HighInsideLowOutside.args = {
  inside: 20000,
  outside: 4000,
}

export const LowInsideHighOutside = Template.bind({});
LowInsideHighOutside.args = {
  inside: 2000,
  outside: 12000,
}

export const LargeDifferenceFavoringInside = Template.bind({});
LargeDifferenceFavoringInside.args = {
  inside: 210,
  outside: 4,
}

export const LargeDifferenceFavoringOutside = Template.bind({});
LargeDifferenceFavoringOutside.args = {
  inside: 7,
  outside: 190,
}

export const AmountsUnder1000 = Template.bind({});
AmountsUnder1000.args = {
  inside: 800,
  outside: 500,
}

export const AmountOver999 = Template.bind({});
AmountOver999.args = {
  inside: 1000,
  outside: 1500,
}

export const AmountOver9999 = Template.bind({});
AmountOver9999.args = {
  inside: 10000,
  outside: 15000,
}

export const AmountOver99999 = Template.bind({});
AmountOver99999.args = {
  inside: 100000,
  outside: 150000,
}

export const AmountOver999999 = Template.bind({});
AmountOver999999.args = {
  inside: 1000000,
  outside: 1300000,
}
