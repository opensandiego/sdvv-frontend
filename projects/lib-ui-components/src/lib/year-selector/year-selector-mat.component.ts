import { Component, computed, input, model, ViewEncapsulation } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

interface ElectionYearItem {
  year: string;
}

/**
 * This component was intended to be a replacement for YearSelectorComponent
 * within YearSelectorGQLComponent. This component uses angular/material.
 * This component was superseded by YearSelectorV2Component.
 */
@Component({
  selector: 'year-selector-mat',
  template: ` <mat-form-field class="year-select-list">
    <mat-label>Election Year</mat-label>
    <mat-select
      panelClass="year-select-list-panel"
      [disabled]="disableSelect()"
      [ngModel]="selectedYear()"
      (selectionChange)="selectYear($event)"
    >
      @for (year of years(); track year) {
      <mat-option [value]="year.year">{{ year.year }}</mat-option>
      }
    </mat-select>
  </mat-form-field>`,
  styles: [
    `
      .year-select-list {
        width: 100%;
      }
    `,
  ],
  encapsulation: ViewEncapsulation.None,
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
  ],
})
export class YearSelectorMatComponent {
  years = input<ElectionYearItem[]>([]);

  public selectedYear = model<string | undefined>();
  public disableSelect = computed(() => (this.years()?.length ?? 0) < 1);

  selectYear(event: MatSelectChange) {
    const year = event.source.value;
    this.selectedYear.set(year);
  }
}
