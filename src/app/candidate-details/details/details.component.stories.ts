import { Meta, Story } from '@storybook/angular/types-6-0';
import { moduleMetadata, componentWrapperDecorator } from '@storybook/angular';

import { CandidateDetailsModule } from '../candidate-details.module';

import { DetailsComponent } from './details.component';
import { CandidateService } from 'src/app/store/services/candidate.service';
import { of } from 'rxjs';
import * as CandidateDetailsHeaderStories from '../candidate-details-header/candidate-details-header.component.stories'
import { HttpClientModule } from '@angular/common/http';

export default {
  title: 'Candidate Details/Details',
  component: DetailsComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [
        CandidateDetailsModule,
        HttpClientModule,
      ],
      providers: [],
    }),
    componentWrapperDecorator(story => `<div style="margin: 3em">${story}</div>`),
  ], 
  argTypes: {
  },
} as Meta;


const Template: Story<DetailsComponent> = (args: DetailsComponent) => ({
  props: args,
})

export const Default = Template.bind({});
Default.args = {
};
