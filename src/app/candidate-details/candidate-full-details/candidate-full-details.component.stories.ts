import { Meta, Story } from '@storybook/angular/types-6-0';
import { moduleMetadata, componentWrapperDecorator } from '@storybook/angular';

import { CandidateDetailsModule } from '../candidate-details.module';

import { CandidateFullDetailsComponent } from './candidate-full-details.component';
import * as CandidateDetailsHeaderStories from '../candidate-details-header/candidate-details-header.component.stories'

import * as RaisedVSpentTabStories from './../details-tab-raised-v-spent/details-tab-raised-v-spent.component.stories';
import * as RaisedByIndustryTabStories from './../details-tab-raised-by-industry/details-tab-raised-by-industry.component.stories';
import * as RaisedByLocationTabStories from './../details-tab-raised-by-location/details-tab-raised-by-location.component.stories';
import * as OutsideMoneyTabStories from './../details-tab-outside-money/details-tab-outside-money.component.stories';


export default {
  title: 'Candidate Details/Full Details',
  component: CandidateFullDetailsComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [
        CandidateDetailsModule,
      ],
      providers: [],
    }),
    componentWrapperDecorator(story => `<div style="margin: 3em">${story}</div>`),
  ], 
  argTypes: {
  },
} as Meta;


const Template: Story<CandidateFullDetailsComponent> = (args: CandidateFullDetailsComponent) => ({
  props: args,
})

export const Default = Template.bind({});
Default.args = {
  header: CandidateDetailsHeaderStories.Default.args,

  raisedVSpentData: RaisedVSpentTabStories.Default.args,
  raisedByIndustries: RaisedByIndustryTabStories.Default.args.raisedByIndustries,
  raisedByLocationData: RaisedByLocationTabStories.Default.args.raisedByLocations,
  outsideMoneyData: OutsideMoneyTabStories.Default.args,
};
