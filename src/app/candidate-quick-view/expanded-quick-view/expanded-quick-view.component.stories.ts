import { Meta, Story } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';

import { ExpandedQuickViewComponent } from './expanded-quick-view.component';

import { CandidateQuickViewModule } from '../candidate-quick-view.module';
import { CandidateQuickViewService } from 'src/app/store/services/candidate.quickview.service';
import { MockCandidateQuickViewService } from './expanded-quick-view.component.stories.mock-candidate.service';

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
        CandidateQuickViewModule,
      ],
      providers: [
      ],
    }),
  ],  
  argTypes: {
    candidateId: { type: 'string' },
  },
} as Meta;

const Template: Story<ExpandedQuickViewComponent> = (args: ExpandedQuickViewComponent) => ({
  moduleMetadata: {
    providers: [
      { provide: CandidateQuickViewService, useClass: MockCandidateQuickViewService },
    ],
    imports: [
    ],
    exports: [
    ]
  },
  props: args,
})

export const Default = Template.bind({});
Default.args = {
  candidateId: 'mock|id',
};
