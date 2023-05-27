// import { Meta, Story } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';

import { ContributionsByCodeGQLComponent } from './contributions-by-code-gql.component';
import { ContributionsByCodeGQLModule } from './contributions-by-code-gql.module';

export default {
  title: 'Lib-gql/Contributions by code',
  component: ContributionsByCodeGQLComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [
        CommonModule,
        ContributionsByCodeGQLModule,
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

export const StephenWhitburn2020 = () => ({
  props: {
    candidateId: 'be577485-059c-44c0-94ed-a1678106f3f0|2020'
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
