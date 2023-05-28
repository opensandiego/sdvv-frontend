// import { Meta, Story } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';

import { SupportOpposeBarGQLComponent } from './support-oppose-bar-gql.component';
import { IndependentExpendituresGQLModule } from '../independent-expenditures-gql.module';

export default {
  title: 'Lib-gql/Support Oppose Bar',
  component: SupportOpposeBarGQLComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [
        CommonModule,
        IndependentExpendituresGQLModule,
      ],
      providers: [],
    }),
  ], 
};

export const Default = () => ({
  props: {
    candidateId: ''
  },
})

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

