// import { Meta, Story } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';

import { TopCategoriesTableComponent } from './top-categories-table.component';

export default {
  title: 'Tables/Top Categories',
  component: TopCategoriesTableComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [ ],
      providers: [],
    }),
  ], 
  argTypes: {  },
};

const Template = (args: TopCategoriesTableComponent) => ({
  props: args,
})

export const Default = Template.bind({});
Default.args = {
  categories: [
    {
      id: '0',
      name: 'Literature and Mailings',
      value: 26321,
      percent: 20.8,
    },
    {
      id: '1',
      name: 'Campaign workers salaries',
      value: 19876,
      percent: 17,
    },
    {
      id: '2',
      name: 'Professional Services',
      subName: '(Legal, Accounting)',
      value: 9876,
      percent: 8,
    },
    {
      id: '3',
      name: 'Campaign Consultants',
      value: 6543,
      percent: 3,
    },
    {
      id: '4',
      name: 'Other',
      value: 5432,
      percent: 2,
    },
  ],
};
