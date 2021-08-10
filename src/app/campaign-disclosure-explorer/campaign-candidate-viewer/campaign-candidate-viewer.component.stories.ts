import { Meta, Story } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';

import { CampaignCandidateViewerComponent } from './campaign-candidate-viewer.component';

import { CampaignDisclosureExplorerModule } from '../campaign-disclosure-explorer.module';


export default {
  title: 'CD Explorer/Candidate Viewer',
  component: CampaignCandidateViewerComponent,
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

const Template: Story<CampaignCandidateViewerComponent> = (args: CampaignCandidateViewerComponent) => ({
  props: args,
});

export const Default = Template.bind({});
Default.args = {
};
