import { Meta, Story } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';

import { ContributionsByGroupTableComponent } from './contributions-by-group-table.component';

import { RoundCurrencyPipe } from '../round-currency.pipe';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

export default {
  title: 'Tables/Donations by Group',
  component: ContributionsByGroupTableComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [
        BrowserAnimationsModule, 
        MatTableModule,
        FontAwesomeModule,
      ],
      providers: [RoundCurrencyPipe],
    }),
  ],  
  argTypes: {
  },
} as Meta;

const Template: Story<ContributionsByGroupTableComponent> = (args: ContributionsByGroupTableComponent) => ({
  props: args,
})

export const Default = Template.bind({});
Default.args = {
  contributionGroups: [
    { name: 'Technology', amount: 500000, percent: 50, },
    { name: 'Finance', amount: 200000, percent: 20, },
    { name: 'Energy', amount: 150000, percent: 15, },
    { name: 'Construction', amount: 100000, percent: 10, },
    { name: 'Other', amount: 50000, percent: 5, },
  ]
};
