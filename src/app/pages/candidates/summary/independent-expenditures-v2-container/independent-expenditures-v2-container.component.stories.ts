
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { NgxEchartsModule } from 'ngx-echarts';

import { IndependentExpendituresV2ContainerComponent } from './independent-expenditures-v2-container.component'

export default {
  title: 'IndependentExpendituresV2ContainerComponent',
  component: IndependentExpendituresV2ContainerComponent,
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

export const ADefault = () => ({
  props: {
    candidateId: ''
  },
});

export const BarbaraBry2020 = () => ({
  props: {
    candidateId: 'be0a57fb-c0f0-bbd5-0d42-44a6560cbd21|2020'
  },
})

export const ToddGloria2020 = () => ({
  props: {
    candidateId: '24738d25-2b55-4ef8-b78e-dcc4442a6327|2020'
  },
})

export const JenniferCampbell2022 = () => ({
  props: {
    candidateId: 'd3d1c6e7-0add-49f1-9b3d-e9289e7efcf6|2022'
  },
})

export const MonicaMontgomerySteppe2022 = () => ({
  props: {
    candidateId: '82cae978-49df-4a77-8793-0efffb7772b5|2022'
  },
})

export const LoriSaldana2022 = () => ({
  props: {
    candidateId: 'b3743dcf-ba16-1389-aa07-d28f26d4a94d|2022'
  },
})

export const LorieZapf2018 = () => ({
  props: {
    candidateId: 'de716602-9097-7b64-0b50-09eeb5b8bb29|2018'
  },
})
