import { Meta, Story } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';

import { CampaignTransactionViewerComponent } from './campaign-transaction-viewer.component';

import { CampaignDisclosureExplorerModule } from '../campaign-disclosure-explorer.module';

export default {
  title: 'CD Explorer/Transaction Viewer',
  component: CampaignTransactionViewerComponent,
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

const Template: Story<CampaignTransactionViewerComponent> = (args: CampaignTransactionViewerComponent) => ({
  props: args,
});

export const Default = Template.bind({});
Default.args = {
};
