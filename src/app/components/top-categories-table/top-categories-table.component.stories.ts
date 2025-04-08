import { Meta, StoryObj } from '@storybook/angular';

import { TopCategoriesTableComponent } from './top-categories-table.component';

const meta: Meta<TopCategoriesTableComponent> = {
  title: 'Tables/Top Categories',
  component: TopCategoriesTableComponent,
  decorators: [],
  argTypes: {},
};

export default meta;
type Story = StoryObj<TopCategoriesTableComponent>;

export const Default: Story = {
  args: {
    categories: [
      {
        id: '0',
        name: 'Literature and Mailings',
        value: 26321,
        percent: 20.8,
        color: '#555555',
      },
      {
        id: '1',
        name: 'Campaign workers salaries',
        value: 19876,
        percent: 17,
        color: '#555555',
      },
      {
        id: '2',
        name: 'Professional Services',
        // subName: '(Legal, Accounting)',
        value: 9876,
        percent: 8,
        color: '#555555',
      },
      {
        id: '3',
        name: 'Campaign Consultants',
        value: 6543,
        percent: 3,
        color: '#555555',
      },
      {
        id: '4',
        name: 'Other',
        value: 5432,
        percent: 2,
        color: '#555555',
      },
    ],
  },
};
