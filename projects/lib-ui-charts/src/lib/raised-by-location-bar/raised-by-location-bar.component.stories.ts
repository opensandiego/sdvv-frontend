// import { Meta, Story } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxEchartsModule } from 'ngx-echarts';

import { RaisedByLocationBarComponent } from './raised-by-location-bar.component';

export default {
  title: 'Lib-ui-charts/Raised by Location Bar',
  component: RaisedByLocationBarComponent,
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
    raisedByLocations: {
      inDistrict: 18439,
      inCity: 24897,
      inCounty: 35123,
      inState: 37890,
      outState: 15123,
    }
  },
});
