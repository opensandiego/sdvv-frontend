import { applicationConfig } from '@storybook/angular';
import { provideAnimations } from '@angular/platform-browser/animations';

import { RaisedByOutsideMoneyBarComponent } from './raised-by-outside-money-bar.component';

export default {
  title: 'Lib-ui-charts/Raised by Outside Money Bar',
  component: RaisedByOutsideMoneyBarComponent,
  decorators: [
    applicationConfig({
      providers: [provideAnimations()],
    }),
  ],
};

export const Default = () => ({
  props: {
    raisedByOutsideMoney: {
      inOpposition: 123456,
      inSupport: 54321,
    },
  },
});
