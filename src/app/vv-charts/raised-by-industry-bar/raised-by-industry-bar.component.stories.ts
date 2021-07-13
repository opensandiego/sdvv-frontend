import { Meta, Story } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxEchartsModule } from 'ngx-echarts';

import { RaisedByIndustryBarComponent } from './raised-by-industry-bar.component';

export default {
  title: 'ECharts/Raised by Industry Bar',
  component: RaisedByIndustryBarComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [
        BrowserAnimationsModule, 
        NgxEchartsModule.forRoot({
          echarts: () => import('echarts'),
        }),
      ],
      providers: [],
    }),
  ], 
  argTypes: {
    raisedByIndustries: { type: 'array' },
  },
} as Meta;

const Template: Story<RaisedByIndustryBarComponent> = (args: RaisedByIndustryBarComponent) => ({
  props: args,
})

export const Default = Template.bind({});
Default.args = {
  raisedByIndustries: [
    { name: 'Education', value: 43456, },
    { name: 'Technology', value: 42789, },
    { name: 'Healthcare', value: 39212, },
    { name: 'Construction', value: 37111, },
    { name: 'Legal', value: 32279, },
    { name: 'Agriculture', value: 31008, },
    { name: 'Transportation', value: 30089, },
    { name: 'Banking', value: 28123, },
    { name: 'Aerospace', value: 8123, },
    { name: 'Manufacturing', value: 6789, },
    { name: 'Mining', value: 6543, },
    { name: 'Gambling', value: 3123, },
  ],
};

export const OneIndustry = Template.bind({});
OneIndustry.args = {
  raisedByIndustries: [
    { name: 'Technology', value: 42789, },
  ]
};

export const TwoIndustries = Template.bind({});
TwoIndustries.args = {
  raisedByIndustries: [
    { name: 'Construction', value: 37111, },
    { name: 'Mining', value: 6543, },
  ]
};

export const FiveIndustries = Template.bind({});
FiveIndustries.args = {
  raisedByIndustries: [
    { name: 'Manufacturing', value: 6789, },
    { name: 'Agriculture', value: 31008, },
    { name: 'Healthcare', value: 39212, },
    { name: 'Mining', value: 6543, },
    { name: 'Banking', value: 28123, },
  ],
};

export const DuplicatedIndustries = Template.bind({});
DuplicatedIndustries.args = {
  raisedByIndustries: [
    { name: 'Education', value: 43456, },
    { name: 'Technology', value: 42789, },
    { name: 'Healthcare', value: 39212, },
    { name: 'Construction', value: 37111, },
    { name: 'Legal', value: 32279, },
    { name: 'Agriculture', value: 31008, },
    { name: 'Transportation', value: 30089, },
    { name: 'Banking', value: 28123, },
    { name: 'Aerospace', value: 8123, },
    { name: 'Manufacturing', value: 6789, },
    { name: 'Mining', value: 6543, },
    { name: 'Gambling', value: 3123, },
    { name: 'Education 2', value: 43456, },
    { name: 'Technology 2', value: 42789, },
    { name: 'Healthcare 2', value: 39212, },
    { name: 'Construction 2', value: 37111, },
    { name: 'Legal 2', value: 32279, },
    { name: 'Agriculture 2', value: 31008, },
    { name: 'Transportation 2', value: 30089, },
    { name: 'Banking 2', value: 28123, },
    { name: 'Aerospace 2', value: 8123, },
    { name: 'Manufacturing 2', value: 6789, },
    { name: 'Mining 2', value: 6543, },
    { name: 'Gambling 2', value: 3123, },
  ]
};

