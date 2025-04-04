import {
  Meta,
  applicationConfig,
  StoryObj,
  moduleMetadata,
} from '@storybook/angular';

import { provideAnimations } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { IndependentExpendituresV2Component } from './independent-expenditures-v2.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AccordionModule } from 'primeng/accordion';
import { OutsideMoneyStackedBarComponentV2 } from 'projects/lib-ui-charts/src/lib/outside-money-stacked-bar-v2/outside-money-stacked-bar.component';
import { TopCategoriesTableComponent } from 'src/app/components/top-categories-table/top-categories-table.component';

const meta: Meta<IndependentExpendituresV2Component> = {
  title: 'Lib UI Components/Independent Expenditures V2',
  component: IndependentExpendituresV2Component,
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        FontAwesomeModule,
        AccordionModule,
        OutsideMoneyStackedBarComponentV2,
        TopCategoriesTableComponent,
      ],
    }),
    applicationConfig({
      // List of providers and environment providers that should be available to the root component and all its children.
      providers: [provideAnimations()],
    }),
  ],
  excludeStories: /.*Data$/,
  // args: {
  //   ...ActionsData,
  // },
};

export default meta;
type Story = StoryObj<IndependentExpendituresV2Component>;

export const Default: Story = {
  args: {},
};

export const EmptyCommittees: Story = {
  args: {
    oppositionCommittees: [],
    supportCommittees: [],
  },
};

export const WithCommittees: Story = {
  args: {
    oppositionCommittees: [
      {
        id: '0',
        name: 'Expenditure Committee A',
        value: 22321,
        percent: 20.8,
        color: 'red',
      },
      {
        id: '1',
        name: 'Expenditure Committee B',
        value: 11987,
        percent: 17,
        color: 'red',
      },
      {
        id: '2',
        name: 'Expenditure Committee C',
        value: 10345,
        percent: 8,
        color: 'red',
      },
      {
        id: '3',
        name: 'Expenditure Committee D',
        value: 7876,
        percent: 3,
        color: 'red',
      },
      {
        id: '4',
        name: 'Other',
        value: 3654,
        percent: 2,
        color: 'red',
      },
    ],
    supportCommittees: [
      {
        id: '5',
        name: 'Support Committee E',
        value: 26321,
        percent: 20.8,
        color: 'green',
      },
      {
        id: '6',
        name: 'Support Committee F',
        value: 19876,
        percent: 17,
        color: 'green',
      },
      {
        id: '7',
        name: 'Support Committee G',
        value: 12345,
        percent: 8,
        color: 'green',
      },
      {
        id: '8',
        name: 'Support Committee H',
        value: 9876,
        percent: 3,
        color: 'green',
      },
      {
        id: '9',
        name: 'Other',
        value: 7654,
        percent: 2,
        color: 'green',
      },
    ],
  },
};
