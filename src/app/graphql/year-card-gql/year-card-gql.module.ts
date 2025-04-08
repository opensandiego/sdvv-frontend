import { CommonModule } from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { YearCardModule } from 'lib-ui-components';
import { GraphQLModule } from '../graphql.module';
import { YearCardGQLComponent } from './year-card-gql.component';
import { YearCardGQL } from './year-card-gql.query';

@NgModule({ declarations: [
        YearCardGQLComponent,
    ],
    exports: [YearCardGQLComponent],
    bootstrap: [], imports: [CommonModule,
        GraphQLModule,
        YearCardModule], providers: [YearCardGQL, provideHttpClient(withInterceptorsFromDi())] })
export class YearCardGQLModule { }
