import {
  enableProdMode,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { bootstrapApplication, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { GraphQLModule } from './app/graphql/graphql.module';
import { MAIN_ROUTES } from './app/routes/main-routes';
import { AppComponent } from './app/components/app/app.component';
import { environment } from './environments/environment';
import { providePrimeNG } from 'primeng/config';
import { PrimePreset } from './prime-preset';

if (environment.production) {
  enableProdMode();
}

const gtmID = environment.gtm;

bootstrapApplication(AppComponent, {
  providers: [
    provideZoneChangeDetection(),
    providePrimeNG({
      theme: {
        preset: PrimePreset,
        options: {
          darkModeSelector: false,
          cssLayer: {
            name: 'primeng',
            order: 'theme, base, primeng',
          },
        },
      },
    }),
    provideHttpClient(withFetch()),
    provideRouter(MAIN_ROUTES, withComponentInputBinding()),
    importProvidersFrom(
      BrowserAnimationsModule,
      GraphQLModule
      // NgxEchartsModule.forRoot({
      //   echarts: () => import('echarts')
      // }),
    ),
    { provide: 'googleTagManagerId', useValue: gtmID },
    Title,
  ],
}).catch((err) => console.error(err));
