// import { Meta, Story } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';

import { WrapperReactComponentModule } from './wrapper.module';
import { WrapperCustomReactComponent } from './wrapper-CustomReactComponent';

export default {
  title: 'Lib UI React/Example Wrapper',
  component: WrapperCustomReactComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [
        CommonModule,
        WrapperReactComponentModule,
      ],
      providers: [],
    }),
  ],  
};

export const Default = () => ({
  props: {
  },
});

export const Counter9 = () => ({
  props: {
    counter: 9
  },
});
