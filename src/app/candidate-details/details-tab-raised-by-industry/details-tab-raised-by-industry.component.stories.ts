import { Meta, Story } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';

import { CandidateDetailsModule } from '../candidate-details.module';

import { DetailsTabRaisedByIndustryComponent } from './details-tab-raised-by-industry.component';

import * as RaisedByIndustryStories from './../details-raised-by-industry/details-raised-by-industry.component.stories';

export default {
  title: 'Candidate Details/Tab/By Industry',
  component: DetailsTabRaisedByIndustryComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [
        CandidateDetailsModule,
      ],
      providers: [],
    }),
  ], 
  argTypes: { },
} as Meta;

const Template: Story<DetailsTabRaisedByIndustryComponent> = (args: DetailsTabRaisedByIndustryComponent) => ({
  props: args,
});


export const Default = Template.bind({});
Default.args = {
  raisedByIndustries: RaisedByIndustryStories.Default.args.raisedByIndustries,
};
