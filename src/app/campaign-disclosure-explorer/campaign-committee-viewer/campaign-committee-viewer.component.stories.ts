import { Meta, Story } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';

import { CampaignCommitteeViewerComponent } from './campaign-committee-viewer.component';

import { CampaignDisclosureExplorerModule } from '../campaign-disclosure-explorer.module';

export default {
  title: 'CD Explorer/Committee Viewer',
  component: CampaignCommitteeViewerComponent,
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

const Template: Story<CampaignCommitteeViewerComponent> = (args: CampaignCommitteeViewerComponent) => ({
  props: args,
});

export const Default = Template.bind({});
Default.args = {
};
