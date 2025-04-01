import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { AverageDonationModule } from 'lib-ui-components';
import { RaisedVsSpentBarModule } from 'lib-ui-charts';
import { GraphQLModule } from '../graphql.module';
import { RaisedVsSpentGQL } from './raised-vs-spent-bar-gql/raised-vs-spent-gql.query';
import { AverageDonationGQL } from './average-donation-gql/average-donation-gql.query';
import { RaisedVsSpentBarGQLComponent } from './raised-vs-spent-bar-gql/raised-vs-spent-bar-gql.component';
import { AverageDonationGQLComponent } from './average-donation-gql/average-donation-gql.component';

@NgModule({ declarations: [
        RaisedVsSpentBarGQLComponent,
        AverageDonationGQLComponent,
    ],
    exports: [RaisedVsSpentBarGQLComponent, AverageDonationGQLComponent],
    bootstrap: [], imports: [CommonModule,
        GraphQLModule,
        RaisedVsSpentBarModule,
        AverageDonationModule], providers: [RaisedVsSpentGQL, AverageDonationGQL, provideHttpClient(withInterceptorsFromDi())] })
export class RaisedVsSpentGQLModule { }
