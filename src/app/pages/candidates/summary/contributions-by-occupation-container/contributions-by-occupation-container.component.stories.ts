// import { Meta, Story } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ContributionsByOccupationContainerModule } from './contributions-by-occupation-container.module';
import { ContributionsByOccupationContainerComponent } from './contributions-by-occupation-container.component';

export default {
  title: 'Lib-Containers/Contributions by Occupation',
  component: ContributionsByOccupationContainerComponent,
  decorators: [
    moduleMetadata({
      declarations: [ ],
      imports: [
        CommonModule,
        BrowserAnimationsModule,
        MatTooltipModule,
        ContributionsByOccupationContainerModule,
      ],
      providers: [],
    }),
  ],  
  argTypes: {
  },
};


export const Default = () => ({
  props: {  },
})

export const Empty = () => ({
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
