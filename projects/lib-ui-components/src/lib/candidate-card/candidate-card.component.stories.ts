import { Meta, Story } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';

import { CandidateCardComponent } from './candidate-card.component';
import { CandidateCardModule } from './candidate-card.module';

export default {
  title: 'Lib UI Components/Candidate Card',
  component: CandidateCardComponent,
  decorators: [
    moduleMetadata({
      declarations: [ 
      ],
      imports: [
        CandidateCardModule,
      ],
      providers: [],
    }),
  ],  
} as Meta;

const Template: Story<CandidateCardComponent> = (args: CandidateCardComponent) => ({
  props: args,
})

export const Default = Template.bind({});
Default.args = {
  // candidateId: '',
  candidateInfo: {
    firstName: 'First Name',
    lastName: 'Last Name',
    fullName: 'Full Name',
  },
  committeeData: {
    raised: 54321,
    donors: 12345,
  },
  inExpandedCard: true,
};


// export const ExpandedCardView = Template.bind({});
// ExpandedCardView.args = {
//   candidateId: '',
//   inExpandedCard: true,
// };

// export const OfficesListView = Template.bind({});
// OfficesListView.args = {
//   candidateId: '',
//   inExpandedCard: false,
// };
