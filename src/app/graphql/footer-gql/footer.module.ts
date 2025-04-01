import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { GraphQLModule } from '../graphql.module';
import { FooterGQLComponent } from './footer.component';

@NgModule({ declarations: [
        FooterGQLComponent,
    ],
    exports: [
        FooterGQLComponent,
    ], imports: [CommonModule,
        GraphQLModule], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class FooterGQLModule { }
