import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { YearSelectorModule } from 'lib-ui-components';
import { GraphQLModule } from '../graphql.module';
import { YearSelectorGQLComponent } from './year-selector-gql.component';
import { YearSelectorGQL } from './year-selector-gql.query';

@NgModule({ declarations: [
        YearSelectorGQLComponent,
    ],
    exports: [YearSelectorGQLComponent],
    bootstrap: [], imports: [CommonModule,
        GraphQLModule,
        YearSelectorModule], providers: [YearSelectorGQL, provideHttpClient(withInterceptorsFromDi())] })
export class YearSelectorGQLModule { }
