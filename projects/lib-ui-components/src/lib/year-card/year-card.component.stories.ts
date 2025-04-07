import { applicationConfig, Meta, StoryObj } from '@storybook/angular';

import { YearCardComponent } from './year-card.component';
import { provideAnimations } from '@angular/platform-browser/animations';

const meta: Meta<YearCardComponent> = {
  title: 'Lib UI Components/Year Card',
  component: YearCardComponent,
  decorators: [
    applicationConfig({
      providers: [provideAnimations()],
    }),
  ],
};

export default meta;
type Story = StoryObj<YearCardComponent>;

export const Default: Story = {
  args: {},
};

export const Year2022: Story = {
  args: {
    year: '2022',
    mayorCandidateCount: 0,
    cityCouncilCandidateCount: 7,
    cityAttorneyCandidateCount: 0,
  },
};

export const Year2020: Story = {
  args: {
    year: '2020',
    mayorCandidateCount: 14,
    cityCouncilCandidateCount: 17,
    cityAttorneyCandidateCount: 19,
  },
};

export const Year2018: Story = {
  args: {
    year: '2018',
    mayorCandidateCount: 0,
    cityCouncilCandidateCount: 28,
    cityAttorneyCandidateCount: 0,
  },
};

export const Year2018Partial: Story = {
  args: {
    year: '2018',
    mayorCandidateCount: undefined,
    cityCouncilCandidateCount: 28,
    cityAttorneyCandidateCount: null,
  },
};

export const Year2018Empty: Story = {
  args: {
    mayorCandidateCount: undefined,
    cityAttorneyCandidateCount: null,
  },
};
