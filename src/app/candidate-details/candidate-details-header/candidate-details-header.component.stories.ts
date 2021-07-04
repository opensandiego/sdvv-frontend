import { Meta, Story } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { CandidateDetailsHeaderComponent } from './candidate-details-header.component';
import { RoundCurrencyPipe } from '../../vv-charts/round-currency.pipe';

export default {
  title: 'Components/Candidate Details Header',
  component: CandidateDetailsHeaderComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [
        BrowserAnimationsModule,
        FontAwesomeModule,
      ],
      providers: [RoundCurrencyPipe],
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

const Template: Story<CandidateDetailsHeaderComponent> = (args: CandidateDetailsHeaderComponent) => ({
  props: args,
})

export const Default = Template.bind({});
Default.args = {
  imageUrl: 'assets/candidate-card/profile.png',
  candidateName: 'John Jones',
  description: 'Former Fire Fighter and Active Reservist',
  website: 'https://www.google.com/',
  raised: 150000,
  donors: 3250,
  averageDonation: 200,
};
