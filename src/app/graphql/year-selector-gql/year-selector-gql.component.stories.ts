// import { Meta, Story } from '@storybook/angular/types-6-0';
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
};

const Template = (args) => ({
  props: args,
})

export const Default = Template.bind({});
Default.args = {}

export const EmptyStringSelectedYear = Template.bind({});
EmptyStringSelectedYear.args = {
  year: ''
}

export const SelectedYear2022 = Template.bind({});
SelectedYear2022.args = {
  year: '2022'
}

export const SelectedYear2020 = Template.bind({});
SelectedYear2020.args = {
  year: '2020'
}

export const SelectedYearNotValid = Template.bind({});
SelectedYearNotValid.args = {
  year: 'ABCD'
}
