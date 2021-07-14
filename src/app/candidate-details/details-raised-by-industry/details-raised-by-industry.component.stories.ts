import { Meta, Story } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';

import { CandidateDetailsModule } from '../candidate-details.module';

import { DetailsRaisedByIndustryComponent } from './details-raised-by-industry.component';

import * as RaisedByIndustryBarStories from '../../vv-charts/raised-by-industry-bar/raised-by-industry-bar.component.stories';

export default {
  title: 'Candidate Details/Raised By Industry',
  component: DetailsRaisedByIndustryComponent,
  decorators: [
    moduleMetadata({
      declarations: [
      ],
      imports: [
        CandidateDetailsModule,
      ],
      providers: [],
    }),
  ], 
  argTypes: { },
} as Meta;

const Template: Story<DetailsRaisedByIndustryComponent> = (args: DetailsRaisedByIndustryComponent) => ({
  props: args,
})

export const Default = Template.bind({});
Default.args = {
  raisedByIndustries: RaisedByIndustryBarStories.Default.args.raisedByIndustries,
};

export const OneIndustry = Template.bind({});
OneIndustry.args = {
  raisedByIndustries: RaisedByIndustryBarStories.OneIndustry.args.raisedByIndustries,
};

export const TwoIndustries = Template.bind({});
TwoIndustries.args = {
  raisedByIndustries: RaisedByIndustryBarStories.TwoIndustries.args.raisedByIndustries,
};

export const FiveIndustries = Template.bind({});
FiveIndustries.args = {
  raisedByIndustries: RaisedByIndustryBarStories.FiveIndustries.args.raisedByIndustries,
};
