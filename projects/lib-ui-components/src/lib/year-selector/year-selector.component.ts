import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ElectionYear } from '../lib-ui-components.models';

@Component({
  selector: 'year-selector',
  templateUrl: './year-selector.component.html',
  styleUrls: ['./year-selector.component.scss']
})
export class YearSelectorComponent implements OnInit {
  @Input() years: ElectionYear[];

  @Input() 
  get year(): string { return this._year; };
  set year(year: string) {
    this.selectedYear = { year: year };
    this._year = year;
  }
  private _year = '';

  @Output() private yearChange = new EventEmitter<string>();

  selectedYear: ElectionYear;

  constructor( ) { }

  ngOnInit() { }

  selectYear(event) {
    this._year = event?.value?.year;
    this.yearChange.emit(this._year);
  }
}
