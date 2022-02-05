import { Meta, Story } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';

import { CandidateDetailsModule } from '../../../candidate-details/candidate-details.module';

import { DetailsTabRaisedVSpentComponent } from './details-tab-raised-v-spent.component';

import * as TotalRaisedStories from '../details-total-raised/details-total-raised.component.stories';
import * as TotalSpentStories from '../details-total-spent/details-total-spent.component.stories';
import * as RaisedSpentSummaryStories from '../details-raised-spent-summary/details-raised-spent-summary.component.stories';


export default {
  title: 'Candidate Details/Tab/Raised vs Spent',
  component: DetailsTabRaisedVSpentComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [
        CandidateDetailsModule,
      ],
      providers: [],
    }),
  ],
  argTypes: {
  },
} as Meta;

const Template: Story<DetailsTabRaisedVSpentComponent> = (args: DetailsTabRaisedVSpentComponent) => ({
  props: args,
})

export const Default = Template.bind({});
Default.args = {
  raisedData: TotalRaisedStories.Default.args,
  spentData: TotalSpentStories.Default.args,
  summaryData: RaisedSpentSummaryStories.Default.args,
};
