import { Meta, Story } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';

import { CandidateDetailsModule } from '../../../candidate-details/candidate-details.module';

import { DetailsRaisedSpentSummaryComponent } from './details-raised-spent-summary.component';


export default {
  title: 'Candidate Details/Raised Spent Summary',
  component: DetailsRaisedSpentSummaryComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [
        CandidateDetailsModule,
      ],
      providers: [],
    }),
  ], 
  argTypes: {  },
} as Meta;

const Template: Story<DetailsRaisedSpentSummaryComponent> = (args: DetailsRaisedSpentSummaryComponent) => ({
  props: args,
})

export const Default = Template.bind({});
Default.args = {
  raised: 150000,
  spent: 125000,
};
