import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopCategoriesTableComponent } from './components/top-categories-table/top-categories-table.component';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [
    TopCategoriesTableComponent,
  ],
  imports: [
    CommonModule,
    MatTableModule,
  ],
  exports: [
    TopCategoriesTableComponent,
  ],
  providers: []
})
export class SharedModule { }
