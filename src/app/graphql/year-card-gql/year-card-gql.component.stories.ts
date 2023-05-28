// import { Meta, Story } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';

import { YearCardGQLModule } from './year-card-gql.module';
import { YearCardGQLComponent } from './year-card-gql.component';

export default {
  title: 'Lib-gql/Year Card',
  component: YearCardGQLComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [
        CommonModule,
        YearCardGQLModule,
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

export const Year2022 = Template.bind({});
Year2022.args = {
  year: '2022'
}

export const Year2020 = Template.bind({});
Year2020.args = {
  year: '2020'
}

export const Year2018 = Template.bind({});
Year2018.args = {
  year: '2018'
}

export const Year2016 = Template.bind({});
Year2016.args = {
  year: '2016'
}

export const Year2014 = Template.bind({});
Year2014.args = {
  year: '2014'
}

export const SelectedYearNotValid = Template.bind({});
SelectedYearNotValid.args = {
  year: 'ABCD'
}
