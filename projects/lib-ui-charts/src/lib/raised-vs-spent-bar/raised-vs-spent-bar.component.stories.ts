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
};

export const Default = () => ({
  props: {
    raised: 200,
    spent: 300,
  },
})

export const Thousands = () => ({
  props: {
    raised: 6001,
    spent: 4002,
  },
})

export const TenThousands = () => ({
  props: {
    raised: 30001,
    spent: 70002,
  },
})

export const HundredThousands = () => ({
  props: {
    raised: 654321,
    spent: 543210,
  },
})

export const Millions = () => ({
  props: {
    raised: 5432109,
    spent: 6543210,
  },
})

export const TenMillions = () => ({
  props: {
    raised: 65432109,
    spent: 54321098,
  },
})

export const LargerRaised = () => ({
  props: {
    raised: 654321,
    spent: 54321,
  },
})

export const LargerSpent = () => ({
  props: {
    raised: 650,
    spent: 50321,
  },
})

export const BothZero = () => ({
  props: {
    raised: 0,
    spent: 0,
  },
})

export const RaisedNull = () => ({
  props: {
    raised: null,
    spent: 4321,
  },
})

export const SpentNoDefined = () => ({
  props: {
    raised: 1234,
  },
})
