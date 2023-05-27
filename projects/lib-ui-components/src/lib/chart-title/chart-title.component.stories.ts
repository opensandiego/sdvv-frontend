// import { Meta, Story } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { ChartTitleComponent } from './chart-title.component';
import { APP_INITIALIZER } from '@angular/core';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

export default {
  title: 'Lib UI Components/Chart Title',
  component: ChartTitleComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [
        BrowserAnimationsModule,
        FontAwesomeModule,
        MatTooltipModule,
      ],
      providers: [
        {
          provide: APP_INITIALIZER,
          useFactory: (library: FaIconLibrary) => {
            return async () => {
              library.addIcons(faQuestionCircle);
            };
          },
          deps: [ FaIconLibrary ],
          multi: true,
        }
      ],
    }),
  ], 
  argTypes: { },
};

const Template= (args: ChartTitleComponent) => ({
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
