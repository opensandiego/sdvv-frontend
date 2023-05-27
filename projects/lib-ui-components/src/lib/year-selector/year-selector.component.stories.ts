// import { Meta, Story } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { YearSelectorComponent } from './year-selector.component';
import { YearSelectorModule } from './year-selector.module';

export default {
  title: 'Lib UI Components/Year Selector',
  component: YearSelectorComponent,
  decorators: [
    moduleMetadata({
      declarations: [ 
      ],
      imports: [
        BrowserAnimationsModule,
        YearSelectorModule,
      ],
      providers: [],
    }),
  ],  
};

const Template = (args: YearSelectorComponent) => ({
  props: {
    years: args.years,
    selectedYear: args.selectedYear,

    // Needed for Actions in the Storybook UI to detect emitted events
    selectedYearChange: args.selectedYearChange,
  }
})

const ElectionYears = [
  {
    year: '2026',
  },
  {
    year: '2024',
  },
  {
    year: '2022',
  },
  {
    year: '2020',
  },
  {
    year: '2018',
  },
  {
    year: '2016',
  },
  {
    year: '2014',
  },
  {
    year: '2012',
  },
];

export const Default = Template.bind({});
Default.args = {}

export const ManyYears2024Selected = Template.bind({});
ManyYears2024Selected.args = {
  years: ElectionYears,
  selectedYear: '2024',
};

export const ManyYears2012Selected = Template.bind({});
ManyYears2012Selected.args = {
  years: ElectionYears,
  selectedYear: '2012',
};

export const UnsortedYears = Template.bind({});
UnsortedYears.args = {
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
};

export const NoSelectedYear = Template.bind({});
NoSelectedYear.args = {
  years: ElectionYears,
};

export const NoElectionYears = Template.bind({});
NoElectionYears.args = {
  selectedYear: '2020',
};

export const SelectedYearNull = Template.bind({});
SelectedYearNull.args = {
  years: ElectionYears,
  selectedYear: null,
};
