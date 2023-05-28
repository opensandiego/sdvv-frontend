// import { Meta, Story } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TotalExpendituresModule } from './total-expenditures.module';
import { TotalExpendituresComponent } from './total-expenditures.component';

export default {
  title: 'Lib UI Components/Total Expenditures',
  component: TotalExpendituresComponent,
  decorators: [
    moduleMetadata({
      declarations: [ ],
      imports: [        
        BrowserAnimationsModule,
        TotalExpendituresModule,
      ],
      providers: [],
    }),
  ], 
  argTypes: {  },
};

export const Default = () => ({
  props: { },
});

export const Amount12456 = () => ({
  props: {
    totalExpenditures: 123456,
    textColor: null,
  },
});
