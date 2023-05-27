// import { Meta, Story } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CandidateMenuModule } from './candidate-menu.module';
import { CandidateMenuComponent } from './candidate-menu.component';

export default {
  title: 'Lib UI Components/Candidate Menu',
  component: CandidateMenuComponent,
  decorators: [
    moduleMetadata({
      declarations: [ 
      ],
      imports: [
        BrowserAnimationsModule,
        CandidateMenuModule,
      ],
      providers: [],
    }),
  ],  
};

const Template = (args: CandidateMenuComponent) => ({
  props: {
    mayor: args.mayor,
    activeItem: args.activeItem,
    ...args,
  }
})


export const Default = Template.bind({});
Default.args = {}

export const Year2020OneOffice = Template.bind({});
Year2020OneOffice.args = {
  activeItem: {
    officeTitle: 'Mayor',
    districtNumber: '2',
    candidateId: '24738d25-2b55-4ef8-b78e-dcc4442a6327|2020',
  },
  detailsActive: true,
  mayor: {
    electionYear: '2020',
    candidates: [
      {
        id: '24738d25-2b55-4ef8-b78e-dcc4442a6327|2020',
        fullName: 'Todd Gloria',
        office: 'Mayor',
        district: null,
        electionYear: '2020',
      },
      {
        id: 'a88a9257-7390-28da-a452-060785715c85|2020',
        fullName: 'Tasha Williamson',
        office: 'Mayor',
        district: null,
        electionYear: '2020',
      },
    ],
  }
   
}

export const Year2020TwoOffices = Template.bind({});
Year2020TwoOffices.args = {
  detailsActive: true,
  mayor: {
    electionYear: '2020',
    candidates: [
      {
        id: '24738d25-2b55-4ef8-b78e-dcc4442a6327|2020',
        fullName: 'Todd Gloria',
        office: 'Mayor',
        district: '',
        electionYear: '2020',
      },
      {
        id: 'a88a9257-7390-28da-a452-060785715c85|2020',
        fullName: 'Tasha Williamson',
        office: 'Mayor',
        district: '',
        electionYear: '2020',
      },
      {
        id: '66b8c132-1328-53b8-0623-13aed0ac4cf1|2020',
        fullName: 'Rich Riel',
        office: 'Mayor',
        district: '',
        electionYear: '2020',
      },
    ],
  },   
  cityAttorney: {
    electionYear: '2020',
    candidates: [
      {
        id: 'dec04882-0666-200b-4bc8-1f66a5a73471|2020',
        fullName: 'Cory Briggs',
        office: 'City Attorney',
        district: '',
        electionYear: '2020',
      },
      {
        id: 'f7957bf1-8701-4456-93dc-6c7022c86b6d|2020',
        fullName: 'Mara Elliott',
        office: 'City Attorney',
        district: '',
        electionYear: '2020',
      },
    ]
  }
}

export const Year2020ThreeOffices = Template.bind({});
Year2020ThreeOffices.args = {
  activeItem: {
    officeTitle: 'City Council',
    districtNumber: '1',
    candidateId: 'string 3',
  },
  detailsActive: true,
  mayor: {
    electionYear: '2020',
    candidates: [
      {
        id: '24738d25-2b55-4ef8-b78e-dcc4442a6327|2020',
        fullName: 'Todd Gloria',
        office: 'Mayor',
        district: '',
        electionYear: '2020',
      },
      {
        id: 'a88a9257-7390-28da-a452-060785715c85|2020',
        fullName: 'Tasha Williamson',
        office: 'Mayor',
        district: '',
        electionYear: '2020',
      },
      {
        id: '66b8c132-1328-53b8-0623-13aed0ac4cf1|2020',
        fullName: 'Rich Riel',
        office: 'Mayor',
        district: '',
        electionYear: '2020',
      },
    ],
  },
  cityAttorney: {
    electionYear: '2020',
    candidates: [
      {
        id: 'dec04882-0666-200b-4bc8-1f66a5a73471|2020',
        fullName: 'Cory Briggs',
        office: 'City Attorney',
        district: '',
        electionYear: '2020',
      },
      {
        id: 'f7957bf1-8701-4456-93dc-6c7022c86b6d|2020',
        fullName: 'Mara Elliott',
        office: 'City Attorney',
        district: '',
        electionYear: '2020',
      },
    ]
  },
  cityCouncil: {
    electionYear: '2020',
    candidates: [
      {
        id: 'dec04882-0666-200b-4bc8-1f66a5a73471|2020',
        fullName: 'Aaron Brennan',
        office: 'City Council',
        district: '1',
        electionYear: '2020',
      },
      {
        id: '08620a66-bcdf-718e-201f-16f197f3b5aa|2020',
        fullName: 'Sam Nejabat',
        office: 'City Council',
        district: '1',
        electionYear: '2020',
      },
      {
        id: 'adeffeff-b9bc-45af-4df2-218db023f1c3|2020',
        fullName: 'Adrian Kwiatkowski',
        office: 'City Council',
        district: '3',
        electionYear: '2020',
      },
      {
        id: 'cd273372-11a7-92ba-ee82-e8e780cb0e54|2020',
        fullName: 'Isaac Wang',
        office: 'City Council',
        district: '5',
        electionYear: '2020',
      },
    ],
  }
}

