
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ElectionYear } from '../lib-ui-components.models';
import { SelectModule } from 'primeng/select';

@Component({
    selector: 'year-selector',
    template: `
    <p-select
      inputId="dropdown"
      [placeholder]="placeholderText"
      [autoDisplayFirst]="false"
      optionLabel="year"
      [options]="electionYears"
      [formControl]="selectedYearModel"
      (onChange)="selectYear()"
      class="w-full py-1"
    />
  `,
    // TODO: fix styling color to change back to blue border and blue text highlight.
    // Fix text vertical spacing
    imports: [ReactiveFormsModule, SelectModule]
})
export class YearSelectorComponent implements OnChanges {
  @Input() years: ElectionYear[];
  @Input() selectedYear: string;
  @Output() selectedYearChange = new EventEmitter<string>();

  public placeholderText: string;

  electionYears: ElectionYear[];
  selectedYearModel = new FormControl<{ year: string }>({
    year: '',
    disabled: false,
  });

  ngOnChanges(changes: SimpleChanges) {
    if (changes['years']) {
      const years = changes['years'].currentValue;
      this.setElectionYears(years);
    }

    if (changes['selectedYear']) {
      const selectedYear = changes['selectedYear'].currentValue;
      this.setYear(selectedYear);
    }
  }

  private setElectionYears(years: ElectionYear[]) {
    if (years?.length > 0) {
      this.selectedYearModel?.enable();
      this.placeholderText = 'Election Year';
      this.electionYears = years;
    } else {
      this.selectedYearModel?.disable();
      this.placeholderText = 'Loading Years...';
    }
  }

  // Called from template
  selectYear() {
    const year = this.selectedYearModel.value.year;
    this.selectedYearChange.emit(year);
  }

  private setYear(selectedYear: string) {
    this.selectedYearModel.setValue({ year: selectedYear });

    // What does the code below do?
    // const isElectionYear = this.years?.some(
    //   (validYear) => validYear.year === selectedYear
    // );
    // if (!isElectionYear) {
    //   return;
    // }
  }
}
