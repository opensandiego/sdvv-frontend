import { Meta, Story } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { CandidateCardComponent } from './candidate-card.component';
import { CandidateModule } from '../../candidate/candidate.module';
import { CandidateCardService } from 'src/app/store/services/candidate.card.service';
import { MockCandidateCardService } from './candidate-card.component.stories.mock-candidate-card.service';

export default {
  title: 'Candidate/Candidate Card',
  component: CandidateCardComponent,
  decorators: [
    moduleMetadata({
      declarations: [ 
      ],
      imports: [
        CandidateModule,
      ],
      providers: [],
    }),
  ],  
  argTypes: {
  },
} as Meta;

const fakeActivatedRoute = {
} as ActivatedRoute;

const Template: Story<CandidateCardComponent> = (args: CandidateCardComponent) => ({
  moduleMetadata: {
    providers: [
      { provide: CandidateCardService, useClass: MockCandidateCardService },
      { provide: ActivatedRoute, useValue: fakeActivatedRoute },
    ],
    imports: [
      RouterTestingModule,
    ],
    exports: [
    ]
  },
  props: args,
})

export const Default = Template.bind({});
Default.args = {
  candidateId: '',
  inExpandedCard: true,
};

export const ExpandedCardView = Template.bind({});
ExpandedCardView.args = {
  candidateId: '',
  inExpandedCard: true,
};

export const OfficesListView = Template.bind({});
OfficesListView.args = {
  candidateId: '',
  inExpandedCard: false,
};
