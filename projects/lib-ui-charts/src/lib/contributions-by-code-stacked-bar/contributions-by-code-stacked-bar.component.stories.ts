import { Meta, StoryObj, applicationConfig } from '@storybook/angular';
import { provideAnimations } from '@angular/platform-browser/animations';

import { ContributionsByCodeStackedBarComponent } from './contributions-by-code-stacked-bar.component';

const meta: Meta<ContributionsByCodeStackedBarComponent> = {
  title: 'Lib-ui-charts/Contributions By Code',
  component: ContributionsByCodeStackedBarComponent,
  decorators: [
    applicationConfig({
      providers: [provideAnimations()],
    }),
  ],
};

export default meta;
type Story = StoryObj<ContributionsByCodeStackedBarComponent>;

export const Default: Story = {
  args: {},
};

export const Sample1: Story = {
  args: {
    monetaryContributionsByCode: {
      ind: 10000,
      com: 0,
      oth: 6000,
      pty: 4000,
      scc: 2500,
    },
    nonMonetaryContributionsByCode: {
      ind: 4000,
      com: 800,
      oth: 7000,
      pty: 0,
      scc: 550,
    },
  },
};

export const Sample2: Story = {
  args: {
    monetaryContributionsByCode: {
      ind: 7000,
      com: 300,
      oth: 800,
      pty: 200,
      scc: 1500,
    },
    nonMonetaryContributionsByCode: {
      ind: 2000,
      com: 800,
      oth: 50,
      pty: 500,
      scc: 750,
    },
  },
};
