import { Meta, Story } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';

import { ElectionFilingUpdaterComponent } from './election-filing-updater.component';

import { CampaignDisclosureExplorerModule } from '../campaign-disclosure-explorer.module';


export default {
    title: 'CD Explorer/Filing Updater',
    component: ElectionFilingUpdaterComponent,
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
  
  const Template: Story<ElectionFilingUpdaterComponent> = (args: ElectionFilingUpdaterComponent) => ({
    props: args,
  });
  
  export const Default = Template.bind({});
  Default.args = {
  };
  