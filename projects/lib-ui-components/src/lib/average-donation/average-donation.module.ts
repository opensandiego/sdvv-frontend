import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AverageDonationComponent } from './average-donation.component';

@NgModule({
  imports: [CommonModule, AverageDonationComponent],
  declarations: [],
  providers: [],
  exports: [AverageDonationComponent],
})
export class AverageDonationModule {}
