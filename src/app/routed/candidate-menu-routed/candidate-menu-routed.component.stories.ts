import { Meta, Story } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';

import { CandidateMenuRoutedModule } from './candidate-menu-routed.module';
import { CandidateMenuRouteComponent } from './candidate-menu-routed.component';

import { YearService } from 'src/app/store/services/year.service';
import { of } from 'rxjs';

class MockYearService implements Partial<YearService> {
  electionYearChanged$ = of('');
}

class MockYear2016Service implements Partial<YearService> {
  electionYearChanged$ = of('2016');
}

class MockYear2020Service implements Partial<YearService> {
  electionYearChanged$ = of('2020');
}

class MockYear2022Service implements Partial<YearService> {
  electionYearChanged$ = of('2022');
}

export default {
  title: 'Lib-routed/Candidate Menu',
  component: CandidateMenuRouteComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [
        CommonModule,
        CandidateMenuRoutedModule,
      ],
      providers: [
        { provide: YearService, useClass: MockYearService },
      ],
    }),
  ], 
} as Meta;

const Template: Story = (args) => ({
  props: args,
})

const Template2016: Story = (args) => ({
  moduleMetadata: {
    providers: [
      { provide: YearService, useClass: MockYear2016Service },
    ]
  },
  props: args,
});

const Template2020: Story = (args) => ({
  moduleMetadata: {
    providers: [
      { provide: YearService, useClass: MockYear2020Service },
    ]
  },
  props: args,
});

const Template2022: Story = (args) => ({
  moduleMetadata: {
    providers: [
      { provide: YearService, useClass: MockYear2022Service },
    ]
  },
  props: args,
});

export const Default = Template.bind({});
export const Year2016 = Template2016.bind({});
export const Year2020 = Template2020.bind({});
export const Year2022 = Template2022.bind({});
