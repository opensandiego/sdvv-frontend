import { Meta, Story } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';

import { ElectionTransactionViewerComponent } from './election-transaction-viewer.component';

import { CampaignDisclosureExplorerModule } from '../campaign-disclosure-explorer.module';

export default {
  title: 'CD Explorer/Transaction Viewer',
  component: ElectionTransactionViewerComponent,
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

const Template: Story<ElectionTransactionViewerComponent> = (args: ElectionTransactionViewerComponent) => ({
  props: args,
});

export const Default = Template.bind({});
Default.args = {
};
