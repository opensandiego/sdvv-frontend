// import { Meta, Story } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxEchartsModule } from 'ngx-echarts';

import { RaisedByOutsideMoneyBarComponent } from './raised-by-outside-money-bar.component';

export default {
  title: 'Lib-ui-charts/Raised by Outside Money Bar',
  component: RaisedByOutsideMoneyBarComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [
        BrowserAnimationsModule, 
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
    raisedByOutsideMoney: {
      inOpposition: 123456,
      inSupport: 54321,
    }
  },
});
