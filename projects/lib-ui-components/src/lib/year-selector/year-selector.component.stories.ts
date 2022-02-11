import { Meta, Story } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';

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
        YearSelectorModule,
      ],
      providers: [],
    }),
  ],  
} as Meta;

const Template: Story<YearSelectorComponent> = (args: YearSelectorComponent) => ({
  props: args,
})

export const Default = Template.bind({});
Default.args = {}

export const ManyYears2024Selected = Template.bind({});
ManyYears2024Selected.args = {
  years: [
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
      year: '2024',
    },
  ],
  year: '2024',
};
export const ManyYears2014Selected = Template.bind({});
ManyYears2014Selected.args = {
  years: [
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
      year: '2024',
    },
  ],
  year: '2014',
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
  year: '2028',
};

export const NoYearSelected = Template.bind({});
NoYearSelected.args = {
  years: [
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
  ],
  selectedYear: null,
};
