// import { Meta, Story } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';

import { DetailsTabOutsideMoneyComponent } from './details-tab-outside-money.component';
import { CandidateDetailsTabOutsideMoneyModule } from '../outside-money-tab.module';

export default {
  title: 'Lib Containers/Outside Money',
  component: DetailsTabOutsideMoneyComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [
        CandidateDetailsTabOutsideMoneyModule,
      ],
      providers: [],
    }),
  ], 
  argTypes: { },
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

export const LorieZapf2018 = () => ({
  props: {
    candidateId: 'de716602-9097-7b64-0b50-09eeb5b8bb29|2018'
  },
})
