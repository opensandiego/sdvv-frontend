import { applicationConfig, Meta, StoryObj } from '@storybook/angular';
import { provideAnimations } from '@angular/platform-browser/animations';

import { RaisedByLocationBarComponent } from './raised-by-location-bar.component';

const meta: Meta<RaisedByLocationBarComponent> = {
  title: 'Lib-ui-charts/Raised by Location Bar',
  component: RaisedByLocationBarComponent,
  decorators: [
    applicationConfig({
      providers: [provideAnimations()],
    }),
  ],
};

export default meta;
type Story = StoryObj<RaisedByLocationBarComponent>;

export const Default: Story = {
  args: {
    raisedByLocations: {
      inDistrict: 18439,
      inCity: 24897,
      inCounty: 35123,
      inState: 37890,
      outState: 15123,
    },
  },
};
