// import { Meta, Story } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';

import { ContributionsByOccupationTableComponent } from './contributions-by-occupation-table.component';

import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { APP_INITIALIZER } from '@angular/core';
import { faCircle } from '@fortawesome/free-solid-svg-icons';

export default {
  title: 'Lib UI Components/Contributions by Occupation',
  component: ContributionsByOccupationTableComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [
        BrowserAnimationsModule,
        MatTableModule,
        FontAwesomeModule,
      ],
      providers: [
        {
          provide: APP_INITIALIZER,
          useFactory: (library: FaIconLibrary) => {
            return async () => {
              library.addIcons(faCircle);
            };
          },
          deps: [ FaIconLibrary ],
          multi: true,
        }
      ],
    }),
  ],  
  argTypes: {
  },
};

export const Default = () => ({
  props: { },
});

export const Empty = () => ({
  props: { 
    contributionGroups: [ ]
  },
});

export const OneGroup = () => ({
  props: { 
    contributionGroups: [
      { name: 'Politics', amount: 123456, percent: 78, },
    ]
  },
});

export const FiveGroups = () => ({
  props: {
    contributionGroups: [
      { name: 'Technology', amount: 500000, percent: 50, },
      { name: 'Finance', amount: 200000, percent: 20, },
      { name: 'Energy', amount: 150000, percent: 15, },
      { name: 'Construction', amount: 100000, percent: 10, },
      { name: 'Other', amount: 50000, percent: 5, },
    ]
  },
});
