import { Meta, Story } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxEchartsModule } from 'ngx-echarts';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { DetailsRaisedByIndustryComponent } from './details-raised-by-industry.component';
import { RaisedByIndustryBarComponent } from '../../vv-charts/raised-by-industry-bar/raised-by-industry-bar.component';

import * as RaisedByIndustryBarStories from '../../vv-charts/raised-by-industry-bar/raised-by-industry-bar.component.stories';

export default {
  title: 'Candidate Details/Raised By Industry',
  component: DetailsRaisedByIndustryComponent,
  decorators: [
    moduleMetadata({
      declarations: [
        DetailsRaisedByIndustryComponent,
        RaisedByIndustryBarComponent,
      ],
      imports: [
        BrowserAnimationsModule,
        FontAwesomeModule,
        MatButtonModule,
        MatTooltipModule,
        NgxEchartsModule.forRoot({
          echarts: () => import('echarts'),
        }),
      ],
      providers: [],
    }),
  ], 
  argTypes: { },
} as Meta;

const Template: Story<DetailsRaisedByIndustryComponent> = (args: DetailsRaisedByIndustryComponent) => ({
  props: args,
})

export const Default = Template.bind({});
Default.args = {
  raisedByIndustriesLocal: RaisedByIndustryBarStories.Default.args.raisedByIndustries,
};

export const OneIndustry = Template.bind({});
OneIndustry.args = {
  raisedByIndustriesLocal: RaisedByIndustryBarStories.OneIndustry.args.raisedByIndustries,
};

export const TwoIndustries = Template.bind({});
TwoIndustries.args = {
  raisedByIndustriesLocal: RaisedByIndustryBarStories.TwoIndustries.args.raisedByIndustries,
};

export const FiveIndustries = Template.bind({});
FiveIndustries.args = {
  raisedByIndustriesLocal: RaisedByIndustryBarStories.FiveIndustries.args.raisedByIndustries,
};
