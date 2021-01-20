import { Meta, Story } from '@storybook/angular';

import { RaisedInOutDonutComponent } from './raised-in-out-donut.component'; // component being tested
import { RoundCurrencyPipe } from '../round-currency.pipe'; // component dependency

import { ChartsModule } from 'ng2-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTooltipModule } from '@angular/material/tooltip';

/**
 * This file can be used as a template to copy and then customize to test a component. The 
 * component does not need to be part of a module to test in Storybook. This .stories.ts file 
 * should be located in the same folder as the component but it can be located elsewhere if needed.
 * 
 * To customize change the .component import line above to the component to test.
 * Then change all references to that component below. Modify the title and argTypes in the 
 * default export. Update the template if needed. Remove all but one of the stores (named exports).
 * Customize the remaining story then duplicate the story for each test case. The Controls setup 
 * by the argTypes can be used in place of some tests since they allow for live changes to @Inputs.
 * 
 * Use 'npm run storybook' to start Storybook at localhost:6006
 */


/**
 * export default: required for each component 
 * title: shows in Storybook component list as heading/expanded list
 * argTypes: used to customize the type of controls at the bottom of Storybook
 *   names should match the component @Inputs
 * 
 * Controls allow the inputs to be changed from within the Storybook UI
 */
export default {
  title: 'Charts/In vs. Out raised funds',
  component: RaisedInOutDonutComponent,
  argTypes: {
    inside: { control: 'number' },
    outside: { control: 'number' },
    jurisdiction: { control: 'text' },
    jurisdictionSuffix: { control: 'text' },
    areaName: { control: 'text' },
  },
} as Meta;


/**
 * imports: for dependencies that would usually be provided in the module containing the component
 * providers: for component dependencies
 * 
 * The same template is used for the component stories below it.
 */
const Template: Story<RaisedInOutDonutComponent> = (args: RaisedInOutDonutComponent) => ({
  component: RaisedInOutDonutComponent,
  moduleMetadata: {
    declarations: [],
    imports: [BrowserAnimationsModule, ChartsModule, MatTooltipModule],
    providers: [RoundCurrencyPipe],
  },
  props: args,
})

/**
 * Each of the named exports below is a what Storybook calls a story. 
 * These are like test cases. Each will show up under the title in the
 * default export above. 
 * 
 * Each story below reuses the Template above
 */
export const DistrictWithSuffix = Template.bind({});
DistrictWithSuffix.args = {
  // The args you need here will depend on your component
  // Each will be passed to a corresponding component input  
  inside: 1000,
  outside: 5000,
  jurisdiction: 'District',
  jurisdictionSuffix: '1',
  areaName: 'San Diego City',
}

export const CityNoSuffix = Template.bind({});
CityNoSuffix.args = {
  inside: 1000,
  outside: 5000,
  jurisdiction: 'City',
  areaName: 'San Diego City',
}

export const CheckCityNameInTooltip = Template.bind({});
CheckCityNameInTooltip.args = {
  inside: 3000,
  outside: 5000,
  jurisdiction: 'City',
  areaName: 'Special Tooltip City',
}

export const EqualInAndOut = Template.bind({});
EqualInAndOut.args = {
  inside: 1234,
  outside: 1234,
  jurisdiction: 'City',
  areaName: 'San Diego City,'
};

export const HighInsideLowOutside = Template.bind({});
HighInsideLowOutside.args = {
  inside: 20000,
  outside: 4000,
  jurisdiction: 'City',
  areaName: 'San Diego City',
}

export const LowInsideHighOutside = Template.bind({});
LowInsideHighOutside.args = {
  inside: 2000,
  outside: 12000,
  jurisdiction: 'City',
  areaName: 'San Diego City',
}

export const LargeDifferenceFavoringInside = Template.bind({});
LargeDifferenceFavoringInside.args = {
  inside: 210,
  outside: 4,
  jurisdiction: 'City',
  areaName: 'San Diego City',
}

export const LargeDifferenceFavoringOutside = Template.bind({});
LargeDifferenceFavoringOutside.args = {
  inside: 7,
  outside: 190,
  jurisdiction: 'City',
  areaName: 'San Diego City',
}

export const AmountsUnder1000 = Template.bind({});
AmountsUnder1000.args = {
  inside: 800,
  outside: 500,
  jurisdiction: 'City',
  areaName: 'San Diego City',
}

export const AmountOver999 = Template.bind({});
AmountOver999.args = {
  inside: 1000,
  outside: 1500,
  jurisdiction: 'City',
  areaName: 'San Diego City',
}

export const AmountOver9999 = Template.bind({});
AmountOver9999.args = {
  inside: 10000,
  outside: 15000,
  jurisdiction: 'City',
  areaName: 'San Diego City',
}

export const AmountOver99999 = Template.bind({});
AmountOver99999.args = {
  inside: 100000,
  outside: 150000,
  jurisdiction: 'City',
  areaName: 'San Diego City',
}

export const AmountOver999999 = Template.bind({});
AmountOver999999.args = {
  inside: 1000000,
  outside: 1300000,
  jurisdiction: 'City',
  areaName: 'San Diego City',
}
