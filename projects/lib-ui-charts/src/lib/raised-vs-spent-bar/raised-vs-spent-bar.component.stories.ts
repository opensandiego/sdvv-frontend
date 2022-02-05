import { Meta, Story } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

import { NgxEchartsModule } from 'ngx-echarts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RaisedVsSpentBarComponent } from './raised-vs-spent-bar.component';

export default {
  title: 'Lib-ui-charts/Raised vs Spent Bar',
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

export const Default: Story = () => ({
  props: {
    raised: 200,
    spent: 300,
  },
})

export const Thousands: Story = () => ({
  props: {
    raised: 6001,
    spent: 4002,
  },
})

export const TenThousands: Story = () => ({
  props: {
    raised: 30001,
    spent: 70002,
  },
})

export const HundredThousands: Story = () => ({
  props: {
    raised: 654321,
    spent: 543210,
  },
})

export const Millions: Story = () => ({
  props: {
    raised: 5432109,
    spent: 6543210,
  },
})

export const TenMillions: Story = () => ({
  props: {
    raised: 65432109,
    spent: 54321098,
  },
})

export const LargerRaised: Story = () => ({
  props: {
    raised: 654321,
    spent: 54321,
  },
})

export const LargerSpent: Story = () => ({
  props: {
    raised: 650,
    spent: 50321,
  },
})

export const BothZero: Story = () => ({
  props: {
    raised: 0,
    spent: 0,
  },
})

export const RaisedNull: Story = () => ({
  props: {
    raised: null,
    spent: 4321,
  },
})

export const SpentNoDefined: Story = () => ({
  props: {
    raised: 1234,
  },
})
