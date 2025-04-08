import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RaisedByLocationBarModule } from 'lib-ui-charts';
import { GraphQLModule } from '../../graphql.module';
import { DetailsContributionsByLocationComponent } from './details-contributions-by-location-gql.component';
import { ContributionsGroupedByLocationGQL } from './details-contributions-by-location-gql.query';

@NgModule({ declarations: [
        DetailsContributionsByLocationComponent,
    ],
    exports: [DetailsContributionsByLocationComponent,],
    bootstrap: [], imports: [CommonModule,
        GraphQLModule,
        RaisedByLocationBarModule], providers: [ContributionsGroupedByLocationGQL, provideHttpClient(withInterceptorsFromDi())] })
export class DetailsContributionsByLocationGQLModule { }
