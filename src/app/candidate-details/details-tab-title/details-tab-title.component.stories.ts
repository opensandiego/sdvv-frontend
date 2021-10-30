import { Meta, Story } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';

import { CandidateDetailsModule } from '../candidate-details.module';

import { DetailsTabTitleComponent } from './details-tab-title.component';

export default {
  title: 'Candidate Details/Tab/Title',
  component: DetailsTabTitleComponent,
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

const Template: Story<DetailsTabTitleComponent> = (args: DetailsTabTitleComponent) => ({
  props: args,
});


export const Default = Template.bind({});
Default.args = {
  smallTitleText: "Tab Small Title",
  largeTitleText: "Tab Large Title",
  tooltipText: "Placeholder tooltip text.",
};


export const ByIndustry = Template.bind({});
ByIndustry.args = {
  smallTitleText: "Amount Raised",
  largeTitleText: "By Industry",
  tooltipText: "Placeholder tooltip text.",
};

export const ByLocation = Template.bind({});
ByLocation.args = {
  smallTitleText: "Amount Raised",
  largeTitleText: "By Location",
  tooltipText: "Placeholder tooltip text.",
};

export const OutsideMoney= Template.bind({});
OutsideMoney.args = {
  smallTitleText: "Amount Raised",
  largeTitleText: "Outside Money",
  tooltipText: "Placeholder tooltip text.",
};
