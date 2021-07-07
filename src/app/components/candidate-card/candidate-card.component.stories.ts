import { Meta, Story } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { CandidateCardComponent } from './candidate-card.component';

export default {
  title: 'Expanded/Candidate Card',
  component: CandidateCardComponent,
  decorators: [
    moduleMetadata({
      declarations: [ 
      ],
      imports: [
        MatButtonModule,
        MatIconModule,
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
    name: 'Jon Jones',
    description: 'Place Holder Description',
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
