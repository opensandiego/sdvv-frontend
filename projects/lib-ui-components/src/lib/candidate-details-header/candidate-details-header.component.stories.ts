// import { Meta, Story } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';

import { CandidateDetailsHeaderModule } from './candidate-details-header.module';
import { CandidateDetailsHeaderComponent } from './candidate-details-header.component';

export default {
  title: 'Lib UI Components/Candidate Details Header',
  component: CandidateDetailsHeaderComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [
        CandidateDetailsHeaderModule,
      ],
      providers: [],
    }),
  ], 
};


export const Default = () => ({
  props: {
  },
})

export const Sample1 = () => ({
  props: {
    id: 'mock|id',
    imageUrl: null,
    candidateName: 'John Jones',
    description: 'Former Fire Fighter and Active Reservist',
    website: 'https://www.google.com/',

    raised: 123456,
    donors: 6789,
    averageDonation: 345,
  },
})

export const Sample2 = () => ({
  props: {
    id: 'mock|id',
    candidateName: 'John Jones II',

    raised: 9876543,
    donors: 20876,
    averageDonation: 100,
  },
})
