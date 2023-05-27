// import { Meta, Story } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';

import { YearCardListGQLComponent } from './year-card-list-gql.component';

export default {
  title: 'Lib-gql/Year Card List',
  component: YearCardListGQLComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [
        CommonModule,
      ],
      providers: [],
    }),
  ], 
};

const Template = (args) => ({
  props: args,
})

export const Default = Template.bind({});
Default.args = {}
