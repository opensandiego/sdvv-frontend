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

import { ElectionDataUpdaterComponent } from './election-data-updater/election-data-updater.component';
import { ExplorerContainerComponent } from './explorer-container/explorer-container.component';
import { ElectionCandidateUpdaterComponent } from './election-candidate-updater/election-candidate-updater.component';

@NgModule({
  declarations: [
    ElectionDataUpdaterComponent,
    ExplorerContainerComponent,
    ElectionCandidateUpdaterComponent,
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
    ElectionDataUpdaterComponent,
    ExplorerContainerComponent,
    ElectionCandidateUpdaterComponent,
  ],
  providers: []

})
export class CampaignDisclosureExplorerModule { }
