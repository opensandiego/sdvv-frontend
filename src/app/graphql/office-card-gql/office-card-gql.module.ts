import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OfficeCardModule } from 'lib-ui-components';

import { GraphQLModule } from '../graphql.module';
import { OfficeCardGQLComponent } from './office-card-gql.component';
import { OfficeCardGQLInfo } from './office-card-gql-info.query';
import { OfficeCardGQLData } from './office-card-gql-data.query';


@NgModule({ declarations: [
        OfficeCardGQLComponent,
    ],
    exports: [OfficeCardGQLComponent],
    bootstrap: [], imports: [CommonModule,
        GraphQLModule,
        OfficeCardModule], providers: [OfficeCardGQLInfo, OfficeCardGQLData, provideHttpClient(withInterceptorsFromDi())] })
export class OfficeCardGQLModule { }
