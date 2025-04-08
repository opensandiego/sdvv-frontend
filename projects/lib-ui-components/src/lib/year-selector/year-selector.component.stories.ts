import {
  Meta,
  applicationConfig,
  StoryObj,
  moduleMetadata,
} from '@storybook/angular';

import { YearSelectorComponent } from './year-selector.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { SelectModule } from 'primeng/select';

export const ActionsData = {
  selectedYearChange: () => {},
};

const meta: Meta<YearSelectorComponent> = {
  title: 'Lib UI Components/Election Year Selector',
  component: YearSelectorComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, SelectModule],
    }),
    applicationConfig({
      // List of providers and environment providers that should be available to the root component and all its children.
      providers: [provideAnimations()],
    }),
  ],
  excludeStories: /.*Data$/,
  args: {
    ...ActionsData,
  },
};

export default meta;
type Story = StoryObj<YearSelectorComponent>;

const ElectionYears = [
  '2026',
  '2024',
  '2022',
  '2020',
  '2018',
  '2016',
  '2014',
  '2012',
].map((year) => ({ year }));

export const Default: Story = {
  args: {},
};

export const ManyYears2024Selected: Story = {
  args: {
    years: ElectionYears,
    selectedYear: '2024',
  },
};

export const ManyYears2012Selected: Story = {
  args: {
    years: ElectionYears,
    selectedYear: '2012',
  },
};

export const UnsortedYears: Story = {
  args: {
    years: [
      {
        year: '2020',
      },
      {
        year: '2018',
      },
      {
        year: '2022',
      },
      {
        year: '2028',
      },
    ],
    selectedYear: '2028',
  },
};

export const NoElectionYears: Story = {
  args: {
    selectedYear: '2020',
  },
};

export const SelectedYearNull: Story = {
  args: {
    years: ElectionYears,
    selectedYear: null,
  },
};

export const WithZeroYears: Story = {
  args: {
    years: [],
  },
};

export const WithTwoYears: Story = {
  args: {
    years: [{ year: '2018' }, { year: '2016' }],
  },
};

export const WithFourYears: Story = {
  args: {
    years: [
      { year: '2022' },
      { year: '2020' },
      { year: '2018' },
      { year: '2016' },
    ],
  },
};
