import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTreeModule } from '@angular/material/tree';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { CampaignElectionViewerComponent } from './campaign-election-viewer/campaign-election-viewer.component';
import { CampaignCandidateViewerComponent } from './campaign-candidate-viewer/campaign-candidate-viewer.component';
import { CampaignFilingViewerComponent } from './campaign-filing-viewer/campaign-filing-viewer.component';
import { ExplorerContainerComponent } from './explorer-container/explorer-container.component';
import { ElectionTransactionViewerComponent } from './election-transaction-viewer/election-transaction-viewer.component';

@NgModule({
  declarations: [
    CampaignElectionViewerComponent,
    CampaignCandidateViewerComponent,
    CampaignFilingViewerComponent,
    ExplorerContainerComponent,
    ElectionTransactionViewerComponent,
  ],
  imports: [
    CommonModule,
    MatTreeModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatExpansionModule,
    MatSelectModule,
    FontAwesomeModule,
  ],
  exports: [
    CampaignElectionViewerComponent,
    CampaignCandidateViewerComponent,
    CampaignFilingViewerComponent,
    ExplorerContainerComponent,
    ElectionTransactionViewerComponent,
  ],
  providers: []

})
export class CampaignDisclosureExplorerModule { }
