import { Meta, applicationConfig, StoryObj } from '@storybook/angular';

import { ContributionsByLocationTabComponent } from './contributions-by-location-tab.component';
import { importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { GraphQLModule } from 'src/app/graphql/graphql.module';

const meta: Meta<ContributionsByLocationTabComponent> = {
  title: 'Lib Containers/Contributions By Location Tab',
  component: ContributionsByLocationTabComponent,
  decorators: [
    applicationConfig({
      providers: [importProvidersFrom(GraphQLModule)],
    }),
  ],
  argTypes: {},
};

export default meta;
type Story = StoryObj<ContributionsByLocationTabComponent>;

export const Default: Story = {
  args: {
    candidateId: '',
  },
};
export const BarbaraBry2020: Story = {
  args: {
    candidateId: 'be0a57fb-c0f0-bbd5-0d42-44a6560cbd21|2020',
  },
};

export const JenniferCampbell2022: Story = {
  args: {
    candidateId: 'd3d1c6e7-0add-49f1-9b3d-e9289e7efcf6|2022',
  },
};

export const MonicaMontgomerySteppe2022: Story = {
  args: {
    candidateId: '82cae978-49df-4a77-8793-0efffb7772b5|2022',
  },
};
