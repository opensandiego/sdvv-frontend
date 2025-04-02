import { applicationConfig, moduleMetadata } from '@storybook/angular';
import {
  provideAnimations,
} from '@angular/platform-browser/animations';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ChartTitleComponent } from './chart-title.component';

export default {
  title: 'Lib UI Components/Chart Title',
  component: ChartTitleComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [FontAwesomeModule, MatTooltipModule],
    }),
    applicationConfig({
      providers: [provideAnimations()],
    }),
  ],
  argTypes: {},
};

const Template = (args: ChartTitleComponent) => ({
  props: args,
});

export const Default = Template.bind({});
Default.args = {
  titleText: 'Chart Title',
  tooltipText: 'Placeholder tooltip text.',
};

export const GreenText = Template.bind({});
GreenText.args = {
  titleText: 'Chart Title',
  textColor: 'green',
  tooltipText: 'Placeholder tooltip text.',
  tooltipColor: 'green',
};
