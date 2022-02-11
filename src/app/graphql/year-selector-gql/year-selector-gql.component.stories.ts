import { Meta, Story } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';

import { YearSelectorGQLModule } from './year-selector-gql.module';
import { YearSelectorGQLComponent } from './year-selector-gql.component';

export default {
  title: 'Lib-gql/Election Years',
  component: YearSelectorGQLComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [
        CommonModule,
        YearSelectorGQLModule,
      ],
      providers: [],
    }),
  ], 
} as Meta;

const Template: Story = (args) => ({
  props: args,
})

export const Default = Template.bind({});
Default.args = {}

export const Year2022 = Template.bind({});
Year2022.args = {
  year: '2022'
}

export const Year2020 = Template.bind({});
Year2020.args = {
  year: '2020'
}
