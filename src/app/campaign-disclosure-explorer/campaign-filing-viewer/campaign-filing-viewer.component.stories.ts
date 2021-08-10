import { Meta, Story } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';

import { CampaignFilingViewerComponent } from './campaign-filing-viewer.component';

import { CampaignDisclosureExplorerModule } from '../campaign-disclosure-explorer.module';


export default {
    title: 'CD Explorer/Filing Viewer',
    component: CampaignFilingViewerComponent,
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
  
  const Template: Story<CampaignFilingViewerComponent> = (args: CampaignFilingViewerComponent) => ({
    props: args,
  });
  
  export const Default = Template.bind({});
  Default.args = {
  };
  