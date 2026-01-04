import { Component, computed, input, model } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectChangeEvent, Select } from 'primeng/select';
import { FloatLabel } from 'primeng/floatlabel';

interface ElectionYear {
  year: string;
}
/**
 * When the option changes from no year selected to a year selected
 * there is a temporary overlap with the float label and the year.
 */
@Component({
  selector: 'year-selector-v2',
  template: `
    <p-floatlabel class="w-full" variant="in">
      <p-select
        inputId="over_label"
        [options]="years()"
        [ngModel]="selectedYear()"
        (onChange)="selectYear($event)"
        optionLabel="year"
        optionValue="year"
        [loading]="loadingState()"
        class="w-full"
      />
      <label for="over_label">{{ this.placeholderText() }}</label>
    </p-floatlabel>
  `,
  imports: [FormsModule, ReactiveFormsModule, Select, FloatLabel],
})
export class YearSelectorV2Component {
  years = input<ElectionYear[]>();
  public selectedYear = model<string | undefined>();

  public loadingState = computed(() => (this.years()?.length ?? 0) < 1);
  public placeholderText = computed(() =>
    this.loadingState() ? 'Loading Years...' : 'Election Year'
  );

  selectYear(event: SelectChangeEvent) {
    const year = event.value;
    this.selectedYear.set(year);
  }
}
