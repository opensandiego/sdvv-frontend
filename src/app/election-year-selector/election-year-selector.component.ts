import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OfficeSummaryService } from 'src/app/store/services/office-summary.service';
import { YearService } from 'src/app/store/services/year.service';

interface Year {
  name: string,
}

@Component({
  selector: 'election-year-selector',
  templateUrl: './election-year-selector.component.html',
  styleUrls: ['./election-year-selector.component.scss']
})
export class ElectionYearSelectorComponent implements OnInit {
  years: Year[];
  selectedYear: Year;

  constructor(
    private router: Router,
    private yearService: YearService,
    private officeSummaryService: OfficeSummaryService,
  ) { }

  ngOnInit() {
    this.officeSummaryService.getSummaries()
      .subscribe(offices => {
        const years = offices.map(office => office.year);
        const uniqueYears = [...new Set(years)].sort().reverse();

        this.years = uniqueYears.map(year => ({
          name: year,
        }))
      });

    this.yearService.electionYearChanged$.subscribe(year => {
      this.selectedYear = { name: year };
    })
  }

  change(event) {
    const year = event.value.name;
    this.router.navigate([`year/${year}`]);
  }
}
