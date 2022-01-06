import { Meta, Story } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { ExpandedChartTitleComponent } from './expanded-chart-title.component';

export default {
  title: 'Quick View/Chart Title',
  component: ExpandedChartTitleComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [
        BrowserAnimationsModule,
        FontAwesomeModule,
        MatTooltipModule,
      ],
      providers: [],
    }),
  ], 
  argTypes: { },
} as Meta;

const Template: Story<ExpandedChartTitleComponent> = (args: ExpandedChartTitleComponent) => ({
  props: args,
});

export const Default = Template.bind({});
Default.args = {
  titleText: "Chart Title",
  tooltipText: "Placeholder tooltip text.",
};

export const GreenText = Template.bind({});
GreenText.args = {
  titleText: "Chart Title",
  textColor: 'green',
  tooltipText: "Placeholder tooltip text.",
  tooltipColor: 'green',  
};
