import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { ChartTitleModule } from 'lib-ui-components';
import { RaisedInVsOutDonutModule } from 'lib-ui-charts';
import { GraphQLModule } from '../graphql.module';
import { RaisedInVsOutGQL } from './raised-in-vs-out-donut-gql/raised-in-vs-out-gql.query';
import { CandidateInfoGQL } from './raised-in-vs-out-title-gql/candidate-info-gql.query';
import { RaisedInVsOutTitleGQLComponent } from './raised-in-vs-out-title-gql/raised-in-vs-out-title-gql.component';
import { RaisedInVsOutDonutGQLComponent } from './raised-in-vs-out-donut-gql/raised-in-vs-out-donut-gql.component';

@NgModule({ declarations: [
        RaisedInVsOutTitleGQLComponent,
        RaisedInVsOutDonutGQLComponent,
    ],
    exports: [RaisedInVsOutTitleGQLComponent, RaisedInVsOutDonutGQLComponent],
    bootstrap: [], imports: [CommonModule,
        GraphQLModule,
        ChartTitleModule,
        RaisedInVsOutDonutModule], providers: [RaisedInVsOutGQL, CandidateInfoGQL, provideHttpClient(withInterceptorsFromDi())] })
export class RaisedInVsOutGQLModule { }
