import { applicationConfig, Meta, StoryObj } from '@storybook/angular';
import { provideAnimations } from '@angular/platform-browser/animations';

import { RaisedInVsOutDonutComponent } from './raised-in-vs-out-donut.component';
import { importProvidersFrom } from '@angular/core';
import { GraphQLModule } from 'src/app/graphql/graphql.module';

const meta: Meta<RaisedInVsOutDonutComponent> = {
  title: 'Lib-ui-charts/Raised In vs. Out of Area Donut',
  component: RaisedInVsOutDonutComponent,
  decorators: [
    applicationConfig({
      providers: [importProvidersFrom(GraphQLModule), provideAnimations()],
    }),
  ],
};

export default meta;
type Story = StoryObj<RaisedInVsOutDonutComponent>;

export const Default: Story = {
  args: {
    inside: 5000,
    outside: 1000,
  },
};

export const Example1: Story = {
  args: {
    inside: 1654000,
    outside: 698700,
  },
};

export const LowOutsideFitOverLap1: Story = {
  args: {
    inside: 10000,
    outside: 500,
  },
};

export const LowOutsideFitOverLap2: Story = {
  args: {
    inside: 10000,
    outside: 50,
  },
};

export const MinimalOutsideFit1: Story = {
  args: {
    inside: 10000,
    outside: 1500,
  },
};

export const MinimalOutsideFit2: Story = {
  args: {
    inside: 1000,
    outside: 100,
  },
};

export const EqualInAndOut: Story = {
  args: {
    inside: 1234,
    outside: 1234,
  },
};

export const HighInsideLowOutside: Story = {
  args: {
    inside: 20000,
    outside: 4000,
  },
};

export const LowInsideHighOutside: Story = {
  args: {
    inside: 2000,
    outside: 12000,
  },
};

export const LargeDifferenceFavoringInside: Story = {
  args: {
    inside: 210,
    outside: 4,
  },
};

export const LargeDifferenceFavoringOutside: Story = {
  args: {
    inside: 7,
    outside: 190,
  },
};

export const AmountsUnder1000: Story = {
  args: {
    inside: 800,
    outside: 500,
  },
};

export const AmountOver999: Story = {
  args: {
    inside: 1000,
    outside: 1500,
  },
};

export const AmountOver9999: Story = {
  args: {
    inside: 10000,
    outside: 15000,
  },
};

export const AmountOver99999: Story = {
  args: {
    inside: 100000,
    outside: 150000,
  },
};

export const AmountOver999999: Story = {
  args: {
    inside: 1000000,
    outside: 1300000,
  },
};
