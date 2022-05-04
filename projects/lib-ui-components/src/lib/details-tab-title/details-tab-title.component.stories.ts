import { Meta, Story } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DetailsTabTitleModule } from './details-tab-title.module';
import { DetailsTabTitleComponent } from './details-tab-title.component';

export default {
  title: 'Lib UI Components/Details Tab Title',
  component: DetailsTabTitleComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [
        BrowserAnimationsModule,
        MatTooltipModule,
        DetailsTabTitleModule,
      ],
      providers: [],
    }),
  ], 
  argTypes: { },
} as Meta;

export const Default: Story = () => ({
  props: { },
});

export const SampleText: Story = () => ({
  props: { 
    smallTitleText: "Tab Small Title",
    largeTitleText: "Tab Large Title",
    tooltipText: "Placeholder tooltip text.",
  },
});

export const ByIndustry: Story = () => ({
  props: { 
    smallTitleText: "Amount Raised",
    largeTitleText: "By Industry",
    tooltipText: "Placeholder tooltip text.",
  },
});

export const ByLocation: Story = () => ({
  props: { 
    smallTitleText: "Amount Raised",
    largeTitleText: "By Location",
    tooltipText: "Placeholder tooltip text.",
  },
});

export const OutsideMoney: Story = () => ({
  props: { 
    smallTitleText: "Amount Raised",
    largeTitleText: "Outside Money",
    tooltipText: "Placeholder tooltip text.",
  },
});

export const Nulls: Story = () => ({
  props: { 
    smallTitleText: null,
    largeTitleText: null,
    tooltipText: null,
  },
});
