import { Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges } from '@angular/core';
import { ElectionYear } from '../lib-ui-components.models';

@Component({
  selector: 'year-selector',
  templateUrl: './year-selector.component.html',
  styleUrls: ['./year-selector.component.scss']
})
export class YearSelectorComponent implements OnChanges {
  @Input() years: ElectionYear[];
  @Input() selectedYear: string;
  @Output() selectedYearChange = new EventEmitter<string>();
  
  public dropDownDisabled = false;
  public placeholderText;

  electionYears: ElectionYear[];
  selectedYearModel: ElectionYear = { year: '' };

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
      this.dropDownDisabled = false;
      this.placeholderText = 'Election Year';
      this.electionYears = years;
    } else {
      this.dropDownDisabled = true;
      this.placeholderText = 'Loading Years...';
    }
  }

  selectYear(event) {
    const year = event?.value?.year;
    this.setYear(year);
  }

  private setYear(selectedYear: string) {
    this.selectedYearModel = { year: selectedYear };

    const isElectionYear = this.years?.some( validYear => validYear.year === selectedYear);
    if (!isElectionYear) {
      return; 
    };

    this.selectedYearChange.emit(selectedYear);
  }
}
