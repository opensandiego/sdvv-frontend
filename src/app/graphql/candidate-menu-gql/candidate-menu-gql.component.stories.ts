// import { Meta, Story } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';

import { CandidateMenuGQLModule } from './candidate-menu-gql.module';
import { CandidateMenuGQLComponent } from './candidate-menu-gql.component';

export default {
  title: 'Lib-gql/Candidate Menu',
  component: CandidateMenuGQLComponent,
  decorators: [
    moduleMetadata({
      declarations: [ 
      ],
      imports: [
        CommonModule,
        CandidateMenuGQLModule,
      ],
      providers: [],
    }),
  ],  
};

const Template = (args) => ({
  props: {
    ...args,
  }
})

export const Default = Template.bind({});
Default.args = {}

export const Year2022 = Template.bind({});
Year2022.args = {
  electionYear: '2022',
}

export const Year2022WithSelection = Template.bind({});
Year2022WithSelection.args = {
  electionYear: '2022',
  activeItem: {
    officeTitle: 'City Council',
    districtNumber: '4',
    candidateId: 'd5ca2f79-f6cd-40b8-9b26-d680bd932208|2022',
  },
}

export const Year2020 = Template.bind({});
Year2020.args = {
  electionYear: '2020',
}

export const Year2020DetailsActive = Template.bind({});
Year2020DetailsActive.args = {
  detailsActive: true,
  electionYear: '2020',
}

export const Year2020WithSelection = Template.bind({});
Year2020WithSelection.args = {
  activeItem: {
    officeTitle: 'Mayor',
    districtNumber: '',
    candidateId: '24738d25-2b55-4ef8-b78e-dcc4442a6327|2020',
  },
  detailsActive: true,
  electionYear: '2020',
}

export const Year2018 = Template.bind({});
Year2018.args = {
  electionYear: '2018',
}
