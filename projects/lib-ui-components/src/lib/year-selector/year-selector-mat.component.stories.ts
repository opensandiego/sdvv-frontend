import type { Meta, StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';
import { YearSelectorMatComponent } from './year-selector-mat.component';

export const ComponentData = {
  years: ['2026', '2024', '2022', '2020', '2018', '2016', '2014', '2012'].map(
    (year) => ({ year })
  ),
  selectedYear: '2023',
  events: { selectedYearChange: fn(), },
};

const meta: Meta<YearSelectorMatComponent> = {
  title: 'YearSelectorMatComponent',
  component: YearSelectorMatComponent,
  //👇 Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<YearSelectorMatComponent>;

export const Default: Story = {
  args: {
    years: ComponentData.years,
    selectedYear: ComponentData.selectedYear,
  },
};

export const NoYears: Story = {
  args: {
    // years: [],
    selectedYear: '2020',
  },
};

export const EmptyYears: Story = {
  args: {
    years: [],
    selectedYear: '2022',
  },
};

export const NoYearSelected: Story = {
  args: {
    years: ComponentData.years,
    selectedYear: '',
  },
};

export const Year2024Selected: Story = {
  args: {
    years: ComponentData.years,
    selectedYear: '2024',
  },
};

export const Year2012Selected: Story = {
  args: {
    years: ComponentData.years,
    selectedYear: '2012',
  },
};
