import { Meta, Story } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';

import { CampaignDisclosureExplorerModule } from '../campaign-disclosure-explorer.module';

import { CampaignElectionViewerComponent } from './campaign-election-viewer.component'

export default {
  title: 'CD Explorer/Election Viewer',
  component: CampaignElectionViewerComponent,
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

const Template: Story<CampaignElectionViewerComponent> = (args: CampaignElectionViewerComponent) => ({
  props: args,
});


export const Default = Template.bind({});
Default.args = {
};
