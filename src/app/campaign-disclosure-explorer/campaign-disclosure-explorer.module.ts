import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTreeModule } from '@angular/material/tree';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatExpansionModule } from '@angular/material/expansion';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { ElectionDataUpdaterComponent } from './election-data-updater/election-data-updater.component';
import { ExplorerContainerComponent } from './explorer-container/explorer-container.component';

@NgModule({
  declarations: [
    ElectionDataUpdaterComponent,
    ExplorerContainerComponent,
  ],
  imports: [
    CommonModule,
    MatTreeModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatExpansionModule,
    FontAwesomeModule,
  ],
  exports: [
    ElectionDataUpdaterComponent,
    ExplorerContainerComponent,
  ],
  providers: []

})
export class CampaignDisclosureExplorerModule { }
