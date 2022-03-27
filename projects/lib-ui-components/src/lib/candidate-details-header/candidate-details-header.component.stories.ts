import { Meta, Story } from '@storybook/angular/types-6-0';
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
} as Meta;


export const Default: Story = () => ({
  props: {
  },
})

export const Sample1: Story = () => ({
  props: {
    id: 'mock|id',
    imageUrl: null,
    candidateName: 'John Jones',
    description: 'Former Fire Fighter and Active Reservist',
    website: 'https://www.google.com/',

    raised: 150000,
    donors: 3250,
    averageDonation: 200,
  },
})
