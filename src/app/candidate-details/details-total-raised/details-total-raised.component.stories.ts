import { Meta, Story } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';

import { VvChartsModule } from '../../vv-charts/vv-charts.module';
import { CandidateDetailsModule } from '../candidate-details.module';

import { DetailsTotalRaisedComponent } from './details-total-raised.component';

import * as TotalRaisedBarStories from '../../vv-charts/total-raised-bar/total-raised-bar.component.stories';

export default {
  title: 'Candidate Details/Total Raised',
  component: DetailsTotalRaisedComponent,
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


const Template: Story<DetailsTotalRaisedComponent> = (args: DetailsTotalRaisedComponent) => ({
  props: args,
})

export const Default = Template.bind({});
Default.args = {
  localRaisedCategories: TotalRaisedBarStories.Default.args.raisedCategories,
  totalRaised: 150000,
};
