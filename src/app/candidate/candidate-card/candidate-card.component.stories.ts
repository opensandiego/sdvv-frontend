import { Meta, Story } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';

import { CandidateCardComponent } from './candidate-card.component';

import { CandidateModule } from '../../candidate/candidate.module';

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

const Template: Story<CandidateCardComponent> = (args: CandidateCardComponent) => ({
  props: args,
})

export const Default = Template.bind({});
Default.args = {
  candidateCard: {
    id: '0',
    name: 'Johnson Jones',
    description: 'Place Holder for a Description',
    raised: '150000',
    donors: '3250',
    candidateImgURL: 'assets/candidate-card/profile.png',
  },
  inExpandedCard: true,
};

export const ExpandedCardView = Template.bind({});
ExpandedCardView.args = {
  candidateCard: {
    ...Default.args.candidateCard,
    website: 'https://opensandiego.org/',
  },
  inExpandedCard: true,
};

export const OfficesListView = Template.bind({});
OfficesListView.args = {
  candidateCard: ExpandedCardView.args.candidateCard,
  inExpandedCard: false,
};
