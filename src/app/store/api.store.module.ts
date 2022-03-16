import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CandidateCardService } from './services/candidate.card.service';
import { environment } from 'src/environments/environment';
import { OfficeSummaryService } from './services/office-summary.service';
import { OfficeService } from './services/office.service';
import { LastUpdatedService } from './services/last-updated.service';
import { ElectionService } from './services/election.service';
import { CandidateDetailsService } from './services/candidate.details.service';
import { CandidateNavigationService } from './services/candidate.navigation.service';
import { CandidateQuickViewService } from './services/candidate.quickview.service';
import { CandidateService } from './services/candidate.service';
import { YearService } from './services/year.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  providers: [
    CandidateCardService,
    CandidateDetailsService,
    CandidateNavigationService,
    CandidateQuickViewService,
    CandidateService,
    ElectionService,
    LastUpdatedService,
    OfficeSummaryService,
    OfficeService,
    YearService,
  ],
  exports: [],
})
export class APIStoreModule { }
