import { Meta, Story } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { from } from 'rxjs';

import { ExpandedQuickViewComponent } from './expanded-quick-view.component';

import { CandidateModule } from '../../candidate/candidate.module';
import { CandidateQuickViewModule } from '../../candidate-quick-view/candidate-quick-view.module';

import { CandidateDataService } from '../../services/candidate-data.service';

import * as CandidateCardStories from 
  '../../candidate/candidate-card/candidate-card.component.stories';
import * as ExpandedRaisedVsSpentStories from 
  '../../candidate-quick-view/expanded-raised-vs-spent/expanded-raised-vs-spent.component.stories'
import * as ContributionsByGroupStories from 
  '../../candidate-quick-view/contributions-by-group/contributions-by-group.component.stories'
import * as ExpandedRaisedInVsOutStories from 
  '../../candidate-quick-view/expanded-raised-in-vs-out/expanded-raised-in-vs-out.component.stories'
import * as ExpandedOutsideMoneyStories from 
  '../../candidate-quick-view/expanded-outside-money/expanded-outside-money.component.stories'


export default {
  title: 'Expanded/Quick View',
  component: ExpandedQuickViewComponent,
  decorators: [
    moduleMetadata({
      declarations: [
      ],
      imports: [
        RouterTestingModule,
        CommonModule,
        CandidateModule,
        CandidateQuickViewModule,
      ],
      providers: [

        {
          provide: CandidateDataService, useValue: {
            getCandidateCard: (id) => {
              return from( [CandidateCardStories.Default.args.candidateCard] )
            },
            getRaisedVsSpentChart: (id) => {
              return from( [ExpandedRaisedVsSpentStories.Default.args] )
            },
            getDonationsByGroupChart: (id) => {
              return from( [{groups: ContributionsByGroupStories.Default.args.contributionGroups}] )
            },
            getRaisedInOutChart: (id) => {
              return from( [ExpandedRaisedInVsOutStories.Default.args] )
            },
            getOutsideMoneyChart: (id) => {
              return from( [ExpandedOutsideMoneyStories.Default.args] )
            },
          }

        }
      ],
    }),
  ],  
  argTypes: {
    candidateId: { type: 'string' },
  },
} as Meta;

const Template: Story<ExpandedQuickViewComponent> = (args: ExpandedQuickViewComponent) => ({
  props: args,
})

export const Default = Template.bind({});
Default.args = {
  candidateId: '',
  // candidateCard: CandidateCardStories.Default.args.candidateCard,
  // raisedVsSpentData: ExpandedRaisedVsSpentStories.Default.args,
  // donationsByGroupData: ContributionsByGroupStories.Default.args.contributionGroups,
  // raisedInOutData: ExpandedRaisedInVsOutStories.Default.args,  
  // outsideMoneyData: ExpandedOutsideMoneyStories.Default.args,  
};
