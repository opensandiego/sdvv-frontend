import { Meta, Story } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';

import { ElectionCandidateUpdaterComponent } from './election-candidate-updater.component';

import { CampaignDisclosureExplorerModule } from '../campaign-disclosure-explorer.module';


export default {
  title: 'CD Explorer/Candidate Updater',
  component: ElectionCandidateUpdaterComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [
        CampaignDisclosureExplorerModule,
      ],
      providers: [],
    }),
  ], 
  argTypes: {
  },
} as Meta;

const Template: Story<ElectionCandidateUpdaterComponent> = (args: ElectionCandidateUpdaterComponent) => ({
  props: args,
});

export const Default = Template.bind({});
Default.args = {
};
