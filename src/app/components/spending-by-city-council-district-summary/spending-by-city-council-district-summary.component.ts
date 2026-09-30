import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
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
    @if (processedSummaryData(); as data) {
      <div class="spending-summary-item">
        Total contributions:
        {{ data.totalContributions | currency: 'USD' : 'symbol' : '1.0' }}
      </div>

      <div class="spending-summary-item">|</div>

      <div class="spending-summary-item">
        Total independent expenditures:
        {{
          data.totalIndependentExpenditures | currency: 'USD' : 'symbol' : '1.0'
        }}
      </div>

      <div class="spending-summary-item">|</div>

      <div class="spending-summary-item">
        Combined total:
        {{ data.combinedTotal | currency: 'USD' : 'symbol' : '1.0' }}
      </div>
    }
  </div>`,
  styles: [
    `
      .spending-summary-container {
        display: flex;
        gap: 10px;
      }

      .spending-summary-item {
      }
    `,
  ],
})
export class SpendingByDistrictSummaryComponent {
  private activatedRoute = inject(ActivatedRoute);
  private dataService = inject(SpendingByCityCouncilDistrictService);
  isLoading = this.dataService.isLoading;

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
