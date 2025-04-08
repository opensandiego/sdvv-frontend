// import { Meta, Story } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';
import { inject, provideAppInitializer } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faBalanceScale, faMapMarkedAlt, faQuestion, faUniversity } from '@fortawesome/free-solid-svg-icons';

import { OfficeCardComponent } from './office-card.component';
import { OfficeCardModule } from './office-card.module';

export default {
  title: 'Lib UI Components/Office Card',
  component: OfficeCardComponent,
  decorators: [
    moduleMetadata({
      declarations: [ 
      ],
      imports: [
        OfficeCardModule,
      ],
      providers: [
        provideAppInitializer(() => {
        const initializerFn = ((library: FaIconLibrary) => {
            return async () => {
              // Add the necessary icons inside the initializer body.
              library.addIcons(faUniversity, faBalanceScale, faMapMarkedAlt, faQuestion);
            };
          })(inject(FaIconLibrary));
        return initializerFn();
      })
      ],
    }),
  ],  
};

export const Default = () => ({
  props: { },
});

export const Mayor = () => ({
  props: {
    officeInfo: {
      officeTitle: 'Mayor',
      candidateCount: 12,
    },
    officeData: {
      totalContributions: 12345,
    },
  },
});

export const CityCouncil = () => ({
  props: {
  officeInfo: {
    officeTitle: 'City Council',
    candidateCount: 14,
  },
  officeData: {
    totalContributions: 98765,
  },
  },
});

