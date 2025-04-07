import { Meta, StoryObj, applicationConfig } from '@storybook/angular';
import { provideAnimations } from '@angular/platform-browser/animations';

import { TotalExpendituresComponent } from './total-expenditures.component';

const meta: Meta<TotalExpendituresComponent> = {
  title: 'Lib UI Components/Total Expenditures',
  component: TotalExpendituresComponent,
  decorators: [
    applicationConfig({
      providers: [provideAnimations()],
    }),
  ],
};

export default meta;
type Story = StoryObj<TotalExpendituresComponent>;

export const Default: Story = {
  args: {},
};

export const Amount12456: Story = {
  args: {
    totalExpenditures: 123456,
    textColor: null,
  },
};

export const Amount5678: Story = {
  args: {
    totalExpenditures: 5678,
    textColor: null,
  },
};
