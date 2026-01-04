import { applicationConfig, Meta, StoryObj } from '@storybook/angular';
import { provideAnimations } from '@angular/platform-browser/animations';

import { DetailsContributionsByOccupationHeaderComponent } from './details-contributions-by-occupation-header.component';

const meta: Meta<DetailsContributionsByOccupationHeaderComponent> = {
  title: 'Lib UI Components/Details Contributions by Occupation Header',
  component: DetailsContributionsByOccupationHeaderComponent,
  decorators: [
    applicationConfig({
      providers: [provideAnimations()],
    }),
  ],
  argTypes: {},
};

export default meta;
type Story = StoryObj<DetailsContributionsByOccupationHeaderComponent>;

export const Default: Story = {
  args: {},
};
