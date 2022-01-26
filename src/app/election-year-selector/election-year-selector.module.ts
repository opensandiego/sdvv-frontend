import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';

import { APIStoreModule } from '../store/api.store.module';
import { ElectionYearSelectorComponent } from './election-year-selector.component';

@NgModule({
  declarations: [
    ElectionYearSelectorComponent,
  ],
  imports: [
    CommonModule,
    DropdownModule,
    FormsModule,
    APIStoreModule,
  ],
  exports: [
    ElectionYearSelectorComponent,
  ],
  providers: [],
})
export class ElectionYearSelectorModule { }
