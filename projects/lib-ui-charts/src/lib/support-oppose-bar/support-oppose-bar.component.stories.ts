import { applicationConfig } from '@storybook/angular';
import { provideAnimations } from '@angular/platform-browser/animations';

import { SupportOpposeBarComponent } from './support-oppose-bar.component';

export default {
  title: 'Lib-ui-charts/Support Oppose Bar',
  component: SupportOpposeBarComponent,
  decorators: [
    applicationConfig({
      providers: [provideAnimations()],
    }),
  ],
};

export const Default = () => ({
  props: {
    support: 200123,
    oppose: 5432,
    backgroundColor: 'black',
    textColor: 'white',
  },
});

export const DefaultColors = () => ({
  props: {
    support: 200123,
    oppose: 5432,
  },
});

export const GreyBackgroundWhiteText = () => ({
  props: {
    support: 200123,
    oppose: 5432,
    backgroundColor: 'grey',
    textColor: 'white',
  },
});

export const GreenText = () => ({
  props: {
    support: 200123,
    oppose: 5432,
    textColor: 'green',
  },
});
