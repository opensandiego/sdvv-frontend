// import { Meta, Story } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';

import { TotalSpentDonutComponent } from './total-spent-donut.component';

import { TotalSpentDonutModule } from './total-spent-donut.module';

export default {
  title: 'Lib-ui-charts/Total Spent Donut',
  component: TotalSpentDonutComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [
        CommonModule,
        TotalSpentDonutModule,
      ],
      providers: [],
    }),
  ], 
};

// const Template: Story<TotalSpentDonutComponent> = (args: TotalSpentDonutComponent) => ({
//   props: args,
// })

export const Default = () => ({
  props: {
    spendingCategories: [
      { id: '0', value: 2000, percent: 20, color: '#800000', name: 'Expenditure A',},
      { id: '1', value: 3000, percent: 30, color: '#b30000', name: 'Expenditure B',},
      { id: '2', value: 4000, percent: 40, color: '#cc0000', name: 'Expenditure C',},
      { id: '3', value: 5000, percent: 50, color: '#ff0000', name: 'Expenditure D',},
      { id: '4', value: 6000, percent: 60, color: '#ff9999', name: 'Expenditure E',},
    ]
  },
})

export const Sample1NoCodes = () => ({
  props: {
    spendingCategories: [
      { id: '0', value: 1000, percent: 1, color: '#800000', name: 'Expenditure text',},
      { id: '1', value: 9000, percent: 9, color: '#b30000', name: 'Expenditure with more text',},
      { id: '2', value: 30000, percent: 30, color: '#cc0000', name: 'Expenditure with even more text',},
      { id: '3', value: 40000, percent: 40, color: '#ff0000', name: 'Expenditure with yet some more text',},
      { id: '4', value: 50000, percent: 50, color: '#ff9999', name: 'Expenditure 50',},
    ]
  }
});

export const Sample2NoCodes = () => ({
  props: {
    spendingCategories: [
      { id: '0', value: 200,    percent: 1, color: '#800000', name: 'Books',},
      { id: '1', value: 20000,  percent: 9, color: '#b30000', name: 'Salaries',},
      { id: '2', value: 1000,   percent: 30, color: '#cc0000', name: 'Marketing',},
      { id: '3', value: 7000,   percent: 40, color: '#ff0000', name: 'Lots of Stuff',},
      { id: '4', value: 5000,   percent: 50, color: '#ff9999', name: 'More Stuff',},
      { id: '4', value: 130,    percent: 50, color: '#ff9999', name: 'Stuff',},
      { id: '4', value: 1200,   percent: 50, color: '#ff9999', name: 'Other',},
    ]
  }
});

export const OneCategory = () => ({
  props: {
    spendingCategories: [
      { id: '0', value: 200,    percent: 1, color: '#800000', name: 'Books', code: 'ABC',},
    ]
  }
});

export const TwoCategories = () => ({
  props: {
    spendingCategories: [
      { id: '0', value: 300,    percent: 30, color: '#800000', name: 'Books', code: 'ABC',},
      { id: '1', value: 4000,  percent: 40, color: '#b30000', name: 'Salaries', code: 'DEF',},
    ]
  }
});

export const OneEmptyCode = () => ({
  props: {
    spendingCategories: [
      { id: '0', value: 200,    percent: 30, color: '#800000', name: 'Books', code: 'ABC',},
      { id: '1', value: 20000,  percent: 40, color: '#b30000', name: 'Salaries', code: 'DEF',},
      { id: '3', value: 7000,   percent: 40, color: '#ff0000', name: 'Empty string for code', code: '',},
    ]
  }
});

export const OneNoNameNoCode = () => ({
  props: {
    spendingCategories: [
      { id: '0', value: 200,    percent: 30, color: '#800000', name: 'Books', code: 'ABC',},
      { id: '1', value: 20000,  percent: 40, color: '#b30000', name: 'Salaries', code: 'DEF',},
      { id: '3', value: 7000,   percent: 40, color: '#ff0000',},
    ]
  }
});
