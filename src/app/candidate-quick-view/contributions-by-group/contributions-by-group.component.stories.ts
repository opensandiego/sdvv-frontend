import { Meta, Story } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';

import { ContributionsByGroupComponent } from './contributions-by-group.component';
import { ExpandedChartTitleComponent } from '../expanded-chart-title/expanded-chart-title.component';
import { ContributionsByGroupTableComponent } from '../../vv-charts/contributions-by-group-table/contributions-by-group-table.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

export default {
  title: 'Quick View/Contributions by Group',
  component: ContributionsByGroupComponent,
  decorators: [
    moduleMetadata({
      declarations: [
        ExpandedChartTitleComponent,
        ContributionsByGroupTableComponent,
      ],
      imports: [
        BrowserAnimationsModule, 
        MatTooltipModule, 
        MatTableModule,
        MatIconModule,
        FontAwesomeModule,
      ],
      providers: [],
    }),
  ],  
  argTypes: {
  },
} as Meta;

const Template: Story<ContributionsByGroupComponent> = (args: ContributionsByGroupComponent) => ({
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
