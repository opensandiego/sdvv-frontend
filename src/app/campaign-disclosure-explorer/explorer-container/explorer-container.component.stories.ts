import { Meta, Story } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';

import { CampaignDisclosureExplorerModule } from '../campaign-disclosure-explorer.module';

import { ExplorerContainerComponent } from './explorer-container.component'


export default {
  title: 'CD Explorer/Explorer Container',
  component: ExplorerContainerComponent,
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


const Template: Story<ExplorerContainerComponent> = (args: ExplorerContainerComponent) => ({
  props: args,
});


export const Default = Template.bind({});
Default.args = {
};
