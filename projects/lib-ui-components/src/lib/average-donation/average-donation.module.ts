import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AverageDonationComponent } from './average-donation.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    AverageDonationComponent,
  ],  
  providers: [ ], 
  exports: [ AverageDonationComponent ],
})
export class AverageDonationModule { }
