import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';

import { YearSelectorComponent } from './year-selector.component';

@NgModule({
  declarations: [
    YearSelectorComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    DropdownModule,
  ],
  exports: [
    YearSelectorComponent,
  ],
  providers: [],
})
export class YearSelectorModule { }
