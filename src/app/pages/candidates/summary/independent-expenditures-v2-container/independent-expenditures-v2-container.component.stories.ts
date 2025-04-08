
import { Meta, applicationConfig, StoryObj } from '@storybook/angular';
import { importProvidersFrom } from '@angular/core';

import { IndependentExpendituresV2ContainerComponent } from './independent-expenditures-v2-container.component'
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { GraphQLModule } from 'src/app/graphql/graphql.module';

const meta: Meta<IndependentExpendituresV2ContainerComponent> = {
  title: 'IndependentExpendituresV2ContainerComponent',
  component: IndependentExpendituresV2ContainerComponent,
  decorators: [
    applicationConfig({
      providers: [importProvidersFrom(GraphQLModule), provideAnimationsAsync()],
    }),
  ],
};

export default meta;
type Story = StoryObj<IndependentExpendituresV2ContainerComponent>;

export const ADefault: Story = {
  args: {
    candidateId: ''
  },
};

export const BarbaraBry2020: Story = {
  args: {
    candidateId: 'be0a57fb-c0f0-bbd5-0d42-44a6560cbd21|2020'
  },
};

export const ToddGloria2020: Story = {
  args: {
    candidateId: '24738d25-2b55-4ef8-b78e-dcc4442a6327|2020'
  },
};

export const JenniferCampbell2022: Story = {
  args: {
    candidateId: 'd3d1c6e7-0add-49f1-9b3d-e9289e7efcf6|2022'
  },
};

export const MonicaMontgomerySteppe2022: Story = {
  args: {
    candidateId: '82cae978-49df-4a77-8793-0efffb7772b5|2022'
  },
};

export const LoriSaldana2022: Story = {
  args: {
    candidateId: 'b3743dcf-ba16-1389-aa07-d28f26d4a94d|2022'
  },
};

export const LorieZapf2018: Story = {
  args: {
    candidateId: 'de716602-9097-7b64-0b50-09eeb5b8bb29|2018'
  },
};
