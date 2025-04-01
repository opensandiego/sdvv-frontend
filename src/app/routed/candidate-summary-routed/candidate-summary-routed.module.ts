import { NgModule } from '@angular/core';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CandidateSummaryContainerModule } from 'src/app/pages/candidates/summary/candidate-summary/candidate-summary-container.module';
import { CandidateSummaryRoutedComponent } from './candidate-summary-routed.component';
import { CandidateSummaryRoutingModule } from './candidate-summary-routing.module';

@NgModule({ declarations: [
        CandidateSummaryRoutedComponent,
    ],
    exports: [CandidateSummaryRoutedComponent],
    bootstrap: [], imports: [CommonModule,
        RouterModule,
        CandidateSummaryContainerModule,
        CandidateSummaryRoutingModule], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class CandidateSummaryRoutedModule { }
