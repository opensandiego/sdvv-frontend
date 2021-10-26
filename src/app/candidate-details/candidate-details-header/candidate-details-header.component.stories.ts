import { Meta, Story } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';

import { CandidateDetailsModule } from '../candidate-details.module';

import { CandidateDetailsHeaderComponent } from './candidate-details-header.component';
import { CandidateDetailsService } from 'src/app/store/services/candidate.details.service';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';
import { CandidateDetailsHeader } from 'src/app/store/interfaces/candidate-details-header';

export default {
  title: 'Candidate Details/Details Header',
  component: CandidateDetailsHeaderComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [
        CandidateDetailsModule,
        HttpClientModule,
      ],
      providers: [],
    }),
  ], 
  argTypes: {
    imageUrl: { type: 'string' },
    candidateName: { type: 'string' },
    description: { type: 'string' },
    website: { type: 'string' },
    raised: { type: 'number' },
    donors: { type: 'number' },
    averageDonation: { type: 'number' },
  },
} as Meta;

const mockHeader: CandidateDetailsHeader = {
    id: 'mock|id',
    imageUrl: null,
    candidateName: 'John Jones',
    description: 'Former Fire Fighter and Active Reservist',
    website: 'https://www.google.com/',
    raised: '150000',
    donors: '3250',
    averageDonation: '200',
}

class MockCandidateDetailsService implements Partial<CandidateDetailsService> {
  getHeader = () => of(mockHeader);
}

const Template: Story<CandidateDetailsHeaderComponent> = (args: CandidateDetailsHeaderComponent) => ({
  moduleMetadata: {
    providers: [
      { provide: CandidateDetailsService, useClass: MockCandidateDetailsService }
    ]
  },
  props: args,
})

export const Default = Template.bind({});
Default.args = {
};
