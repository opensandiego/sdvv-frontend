import { Meta, Story } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';

import { CandidateDetailsModule } from '../candidate-details.module';

import { DetailsTabRaisedByLocationComponent } from './details-tab-raised-by-location.component'

import * as RaisedByLocationStories from '../../vv-charts/raised-by-location-bar/raised-by-location-bar.component.stories';

export default {
  title: 'Candidate Details/Tab/By Location',
  component: DetailsTabRaisedByLocationComponent,
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

const Template: Story<DetailsTabRaisedByLocationComponent> = (args: DetailsTabRaisedByLocationComponent) => ({
  props: args,
});

export const Default = Template.bind({});
Default.args = {
  raisedByLocations: RaisedByLocationStories.Default.args.raisedByLocations,
};
