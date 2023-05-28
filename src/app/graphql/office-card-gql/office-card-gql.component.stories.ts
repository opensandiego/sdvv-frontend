// import { Meta, Story } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';

import { OfficeCardGQLModule } from './office-card-gql.module';
import { OfficeCardGQLComponent } from './office-card-gql.component';

export default {
  title: 'Lib-gql/Office Card',
  component: OfficeCardGQLComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [
        CommonModule,
        OfficeCardGQLModule,
      ],
      providers: [],
    }),
  ], 
};

export const Default = () => ({
  props: { },
})

export const Mayor2022 = () => ({
  props: {
    year: '2022',
    officeTitle: 'Mayor',
  },
})

export const CityCouncil2022 = () => ({
  props: {
    year: '2022',
    officeTitle: 'City Council',
  },
})

export const Mayor2020 = () => ({
  props: {
    year: '2020',
    officeTitle: 'Mayor',
  },
})

export const CityAttorney2020 = () => ({
  props: {
    year: '2020',
    officeTitle: 'City Attorney',
  },
})

export const CityCouncil2020 = () => ({
  props: {
    year: '2020',
    officeTitle: 'City Council',
  },
})

