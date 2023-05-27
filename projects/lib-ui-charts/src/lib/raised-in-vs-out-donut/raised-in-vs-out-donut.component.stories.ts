// import { Meta, Story } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';

import { RaisedInVsOutDonutComponent } from './raised-in-vs-out-donut.component';
import { RaisedInVsOutDonutModule } from './raised-in-vs-out-donut.module';

export default {
  title: 'Lib-ui-charts/Raised In vs. Out of Area Donut',
  component: RaisedInVsOutDonutComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [
        CommonModule,
        RaisedInVsOutDonutModule,
      ],
      providers: [],
    }),
  ], 
};

export const Default = () => ({
  props: {
    inside: 5000,
    outside: 1000,
  },
});

export const Example1 = () => ({
  props: {
    inside: 1654000,
    outside: 698700,
  },
});

export const LowOutsideFitOverLap1 = () => ({
  props: {
    inside: 10000,
    outside: 500,
  },
});

export const LowOutsideFitOverLap2 = () => ({
  props: {
    inside: 10000,
    outside: 50,
  },
});

export const MinimalOutsideFit1 = () => ({
  props: {
    inside: 10000,
    outside: 1500,
  },
});

export const MinimalOutsideFit2 = () => ({
  props: {
    inside: 1000,
    outside: 100,
  },
});

export const EqualInAndOut = () => ({
  props: {
    inside: 1234,
    outside: 1234,
  },
});

export const HighInsideLowOutside = () => ({
  props: {
    inside: 20000,
    outside: 4000,
  },
});

export const LowInsideHighOutside = () => ({
  props: {
    inside: 2000,
    outside: 12000,
  },
});

export const LargeDifferenceFavoringInside = () => ({
  props: {
    inside: 210,
    outside: 4,
  },
});

export const LargeDifferenceFavoringOutside = () => ({
  props: {
    inside: 7,
    outside: 190,
  },
});

export const AmountsUnder1000 = () => ({
  props: {
    inside: 800,
    outside: 500,
  },
});

export const AmountOver999 = () => ({
  props: {
    inside: 1000,
    outside: 1500,
  },
});

export const AmountOver9999 = () => ({
  props: {
    inside: 10000,
    outside: 15000,
  },
});

export const AmountOver99999 = () => ({
  props: {
    inside: 100000,
    outside: 150000,
  },
});

export const AmountOver999999 = () => ({
  props: {
    inside: 1000000,
    outside: 1300000,
  },
});
