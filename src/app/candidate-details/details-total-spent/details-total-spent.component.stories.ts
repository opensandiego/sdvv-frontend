import { Meta, Story } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';

import { VvChartsModule } from '../../vv-charts/vv-charts.module';
import { CandidateDetailsModule } from '../candidate-details.module';

import { DetailsTotalSpentComponent } from './details-total-spent.component';

import * as TopCategoriesTableStories from '../top-categories-table/top-categories-table.component.stories';
import * as TotalSpentDonutStories from '../../vv-charts/total-spent-donut/total-spent-donut.component.stories';

export default {
  title: 'Candidate Details/Container/Total Spent',
  component: DetailsTotalSpentComponent,
  decorators: [
    moduleMetadata({
      declarations: [
      ],
      imports: [        
        VvChartsModule,
        CandidateDetailsModule,
      ],
      providers: [],
    }),
  ], 
  argTypes: {  },
} as Meta;

const Template: Story<DetailsTotalSpentComponent> = (args: DetailsTotalSpentComponent) => ({
  props: args,
})

export const Default = Template.bind({});
Default.args = {
  categoriesTable: TopCategoriesTableStories.Default.args.categories,
  totalSpent: -125000,
  cashInHand: 15000,
  loansAndDebts: 10000,
};
