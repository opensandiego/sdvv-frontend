import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TotalExpendituresComponent } from './total-expenditures.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [ TotalExpendituresComponent, ],  
  providers: [ ], 
  exports: [ TotalExpendituresComponent, ],
})
export class TotalExpendituresModule { }
