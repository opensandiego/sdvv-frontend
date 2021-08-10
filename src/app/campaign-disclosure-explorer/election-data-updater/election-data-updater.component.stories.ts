import { Meta, Story } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';

import { CampaignDisclosureExplorerModule } from '../campaign-disclosure-explorer.module';

import { ElectionDataUpdaterComponent } from './election-data-updater.component'

export default {
  title: 'CD Explorer/Election Viewer',
  component: ElectionDataUpdaterComponent,
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

const Template: Story<ElectionDataUpdaterComponent> = (args: ElectionDataUpdaterComponent) => ({
  props: args,
});


export const Default = Template.bind({});
Default.args = {
};
