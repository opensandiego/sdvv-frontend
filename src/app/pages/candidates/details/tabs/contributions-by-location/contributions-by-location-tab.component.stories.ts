// import { Meta, Story } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';

import { ContributionsByLocationTabComponent } from './contributions-by-location-tab.component'
import { CandidateDetailsTabContributionsByLocationModule } from './contributions-by-location-tab.module';

export default {
  title: 'Lib Containers/Contributions By Location Tab',
  component: ContributionsByLocationTabComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [
        CandidateDetailsTabContributionsByLocationModule,
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
