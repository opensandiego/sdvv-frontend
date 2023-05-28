// import { Meta, Story } from '@storybook/angular/types-6-0';
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
};

const Template = (args: CandidateCardComponent) => ({
  props: args,
})

export const Default = Template.bind({});
Default.args = {
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

export const Name1 = Template.bind({});
Name1.args = {
  candidateInfo: {
    firstName: 'One Name',
    lastName: 'One Last Name',
    fullName: 'A Full Name',
    description: 'Somewhat long description with multiple titles',
  },
  committeeData: {
    raised: 98765,
    donors: 5432,
  },
  inExpandedCard: true,
};
