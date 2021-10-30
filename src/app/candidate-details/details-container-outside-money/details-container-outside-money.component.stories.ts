import { Meta, Story } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';

import { CandidateDetailsModule } from '../candidate-details.module';

import { DetailsContainerOutsideMoneyComponent } from './details-container-outside-money.component';

import * as OutsideMoneyStackedBarStories from '../../vv-charts/outside-money-stacked-bar/outside-money-stacked-bar.component.stories'

export default {
  title: 'Candidate Details/Container/Outside Money',
  component: DetailsContainerOutsideMoneyComponent,
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

const Template: Story<DetailsContainerOutsideMoneyComponent> = (args: DetailsContainerOutsideMoneyComponent) => ({
  props: args,
});


export const Default = Template.bind({});
Default.args = {
  oppositionExpendituresCategories: OutsideMoneyStackedBarStories.Default.args.opposedCommittees,
  supportExpendituresCategories: OutsideMoneyStackedBarStories.Default.args.supportCommittees,
};
