import type { Meta, StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';
import { YearSelectorNewComponent } from './year-selector-new.component';

export const ComponentData = {
  years: ['2026', '2024', '2022', '2020', '2018', '2016', '2014', '2012'].map(
    (year) => ({ year })
  ),
  selectedYear: '2023',
  events: { selectedYearChange: fn(), },
};

const meta: Meta<YearSelectorNewComponent> = {
  title: 'YearSelectorNewComponent',
  component: YearSelectorNewComponent,
  //👇 Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<YearSelectorNewComponent>;

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
