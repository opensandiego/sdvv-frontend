import { CommonModule, CurrencyPipe } from '@angular/common';
import {
  Component,
  computed,
  inject,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { filter, map, switchMap } from 'rxjs';
import { SpendingByCityCouncilDistrictService } from 'src/app/services/spending-by-city-council-district.service';

type DistrictsSpendingSummary = {
  totalContributions: number;
  totalIndependentExpenditures: number;
  combinedTotal: number;
};

@Component({
  imports: [CommonModule, CurrencyPipe],
  selector: 'city-council-spending-by-district-summary',
  template: ` <div class="spending-summary-container">
    <div class="spending-summary-items-container">
      @if (processedSummaryData(); as data) {
        <div class="spending-summary-item">
          Total contributions:
          {{
            data.totalContributions
              | currency: 'USD' : 'symbol' : currencyDigits()
          }}
        </div>

        <div class="spending-summary-item">
          Total {{ independentExpendituresText() }}:
          {{
            data.totalIndependentExpenditures
              | currency: 'USD' : 'symbol' : currencyDigits()
          }}
        </div>

        <div class="spending-summary-item">
          Combined total:
          {{
            data.combinedTotal | currency: 'USD' : 'symbol' : currencyDigits()
          }}
        </div>
      }
    </div>
  </div>`,
  styles: [
    `
      .spending-summary-container {
        container-type: inline-size;
      }

      .spending-summary-items-container {
        display: flex;
        flex-direction: row;
        gap: 16px;
      }

      .spending-summary-item {
        white-space: nowrap;
      }

      /* add vertical line */
      .spending-summary-items-container
        .spending-summary-item
        + .spending-summary-item {
        border-left: 2px solid #00000075;
        padding-left: 16px;
      }

      @container (max-width: 850px) {
        .spending-summary-items-container {
          flex-direction: column;
          align-items: flex-start;
        }

        /* remove vertical line */
        .spending-summary-items-container
          .spending-summary-item
          + .spending-summary-item {
          border-left: none;
          padding-left: 0;
        }

        /* add horizontal line */
        .spending-summary-items-container
          .spending-summary-item
          + .spending-summary-item {
          border-top: 2px solid #00000075;
          padding-top: 16px;
        }
      }
    `,
  ],
})
export class SpendingByDistrictSummaryComponent implements OnInit, OnDestroy {
  private activatedRoute = inject(ActivatedRoute);
  private dataService = inject(SpendingByCityCouncilDistrictService);
  isLoading = this.dataService.isLoading;

  private mediaQuery = window.matchMedia('(max-width: 450px)');
  isMobile = signal(this.mediaQuery.matches);

  private listener = (e: MediaQueryListEvent) => this.isMobile.set(e.matches);

  ngOnInit() {
    this.mediaQuery.addEventListener('change', this.listener);
  }

  ngOnDestroy() {
    this.mediaQuery.removeEventListener('change', this.listener);
  }

  currencyDigits = computed(() => (this.isMobile() ? '1.0-0' : '1.0'));

  independentExpendituresText = computed(() =>
    this.isMobile() ? 'independent exp.' : 'independent expenditures',
  );

  public preProcessedData = toSignal(
    this.activatedRoute.paramMap.pipe(
      // get parameter from route
      map((params) => params.get('year')),

      filter((electionYear): electionYear is string => !!electionYear),

      // use parameters from route to get data from service
      switchMap((electionYear) =>
        this.dataService.getSpendingByCityCouncilDistrict({ electionYear }),
      ),
    ),
    { initialValue: null },
  );

  public processedSummaryData = computed<DistrictsSpendingSummary | null>(
    () => {
      const data = this.preProcessedData();
      if (!data) return null;

      const districtsSummary = data.reduce(
        (accumulator, currentValue) => ({
          totalContributions:
            accumulator.totalContributions + currentValue.contributions,
          totalIndependentExpenditures:
            accumulator.totalIndependentExpenditures +
            currentValue.independentExpenditures,
        }),
        {
          totalContributions: 0,
          totalIndependentExpenditures: 0,
        },
      );

      return {
        ...districtsSummary,
        combinedTotal:
          districtsSummary.totalContributions +
          districtsSummary.totalIndependentExpenditures,
      };
    },
  );
}
