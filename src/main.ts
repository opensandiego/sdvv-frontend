import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { GraphQLModule } from './app/graphql/graphql.module';
import { PUBLIC_ROUTES } from './app/public/public-routing.module';
import { AppComponent } from './app/components/app/app.component';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

const gtmID = environment.gtm;

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      RouterModule.forRoot(PUBLIC_ROUTES),
      BrowserAnimationsModule,
      GraphQLModule,
    ),
    { provide: 'googleTagManagerId', useValue: gtmID },
    Title,
  ]
}).catch(err => console.error(err));
