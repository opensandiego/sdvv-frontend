import { Meta, Story } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';

import { CandidateDetailsModule } from '../candidate-details.module';

import { DetailsTabOutsideMoneyComponent } from './details-tab-outside-money.component';

import * as DetailsContainerOutsideMoneyStories  from '../details-container-outside-money/details-container-outside-money.component.stories';

export default {
  title: 'Candidate Details/Tab/Outside Money',
  component: DetailsTabOutsideMoneyComponent,
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

const Template: Story<DetailsTabOutsideMoneyComponent> = (args: DetailsTabOutsideMoneyComponent) => ({
  props: args,
});


export const Default = Template.bind({});
Default.args = {
  oppositionExpendituresCategories: DetailsContainerOutsideMoneyStories.Default.args.oppositionExpendituresCategories,
  supportExpendituresCategories: DetailsContainerOutsideMoneyStories.Default.args.supportExpendituresCategories,
};
