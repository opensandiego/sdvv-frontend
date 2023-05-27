// import { Meta, Story } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';
import { NgxEchartsModule } from 'ngx-echarts';

import { SupportOpposeBarComponent } from './support-oppose-bar.component';

export default {
  title: 'Lib-ui-charts/Support Oppose Bar',
  component: SupportOpposeBarComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [
        NgxEchartsModule.forRoot({
          echarts: () => import('echarts'),
        }),
      ],
      providers: [],
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
