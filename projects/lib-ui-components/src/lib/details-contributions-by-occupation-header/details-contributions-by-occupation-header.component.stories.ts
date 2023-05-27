// import { Meta, Story } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';

import { DetailsContributionsByOccupationHeaderModule } from './details-contributions-by-occupation-header.module';
import { DetailsContributionsByOccupationHeaderComponent } from './details-contributions-by-occupation-header.component';

export default {
  title: 'Lib UI Components/Details Contributions by Occupation Header',
  component: DetailsContributionsByOccupationHeaderComponent,
  decorators: [
    moduleMetadata({
      declarations: [ ],
      imports: [
        CommonModule,
        DetailsContributionsByOccupationHeaderModule,
      ],
      providers: [],
    }),
  ],  
  argTypes: {
  },
};


export const Default = () => ({
  props: {  },
})
