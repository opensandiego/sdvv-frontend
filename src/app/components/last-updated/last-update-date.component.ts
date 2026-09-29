import { DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { filter, map, switchMap } from 'rxjs';
import { TransactionsLastUpdatedService } from 'src/app/services/transactions-last-updated.service';

@Component({
  selector: 'last-update-date',
  imports: [DatePipe],
  template: `
    @if (preProcessedData(); as data) {
      <div class="updated">
        Last updated: {{ data.lastUpdatedDate | date: 'MMMM d, y' }}
      </div>
    }
  `,
  styles: `
    .updated {
      font-size: 0.9em;
      color: #00000088;
    }
  `,
})
export class LastUpdateDateComponent {
  private activatedRoute = inject(ActivatedRoute);

  private dataService = inject(TransactionsLastUpdatedService);
  isLoading = this.dataService.isLoading;

  public preProcessedData = toSignal(
    this.activatedRoute.paramMap.pipe(
      // get parameter from route
      map((params) => params.get('year')),

      filter((electionYear): electionYear is string => !!electionYear),

      switchMap((electionYear) =>
        this.dataService.getLastUpdatedDate({ electionYear }),
      ),

      map((data) => {
        const lastUpdatedDate = new Date(data.date);

        return { lastUpdatedDate };
      }),
    ),
    { initialValue: null },
  );
}
