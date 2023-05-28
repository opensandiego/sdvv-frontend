// import { Meta, Story } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';

import { YearCardModule } from './year-card.module';
import { YearCardComponent } from './year-card.component';

export default {
  title: 'Lib UI Components/Year Card',
  component: YearCardComponent,
  decorators: [
    moduleMetadata({
      declarations: [ 
      ],
      imports: [
        YearCardModule,
      ],
      providers: [      ],
    }),
  ],  
};

export const Default = () => ({
  props: { },
});

export const Year2022 = () => ({
  props: {
    year: '2022',
    mayorCandidateCount: 0,
    cityCouncilCandidateCount: 7,
    cityAttorneyCandidateCount: 0,
  },
});

export const Year2020 = () => ({
  props: {
    year: '2020',
    mayorCandidateCount: 14,
    cityCouncilCandidateCount: 17,
    cityAttorneyCandidateCount: 19,
  },
});

export const Year2018 = () => ({
  props: {
    year: '2018',
    mayorCandidateCount: 0,
    cityCouncilCandidateCount: 28,
    cityAttorneyCandidateCount: 0,
  },
});

export const Year2018Partial = () => ({
  props: {
    year: '2018',
    mayorCandidateCount: undefined,
    cityCouncilCandidateCount: 28,
    cityAttorneyCandidateCount: null,
  },
});

export const Year2018Empty = () => ({
  props: {
    mayorCandidateCount: undefined,
    cityAttorneyCandidateCount: null,
  },
});
