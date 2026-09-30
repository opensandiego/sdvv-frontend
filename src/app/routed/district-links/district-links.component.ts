import { Component, inject, input } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map, switchMap } from 'rxjs';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { SpendingByCityCouncilDistrictService } from 'src/app/services/spending-by-city-council-district.service';

@Component({
  selector: 'district-links',
  standalone: true,
  imports: [FontAwesomeModule, RouterModule],
  template: `
    <div>
      <div>See candidate breakdown by district:</div>

      <div class="district-links-container">
        @for (district of preProcessedData(); track $index) {
          <a
            class="compare-candidates-button"
            mat-flat-button
            [routerLink]="['./', district.districtNumber]"
          >
            {{ district.districtName }}&nbsp;<fa-icon
              [icon]="faArrowRight"
            ></fa-icon>
          </a>
        }
      </div>
    </div>
  `,
  styleUrls: ['./district-links.component.scss'],
})
export class DistrictLinksComponent {
  year = input<string>(''); // value is set from route

  private activatedRoute = inject(ActivatedRoute);
  private dataService = inject(SpendingByCityCouncilDistrictService);
  isLoading = this.dataService.isLoading;

  faArrowRight = faArrowRight;

  public preProcessedData = toSignal(
    this.activatedRoute.paramMap.pipe(
      // get parameter from route
      map((params) => params.get('year')),

      filter((electionYear): electionYear is string => !!electionYear),

      // use parameters from route to get data from service
      switchMap((electionYear) =>
        this.dataService.getSpendingByCityCouncilDistrict({ electionYear }),
      ),

      map((data) => {
        const districtSeries = data
          .map((district) => [
            // only use the number and name fields
            {
              districtNumber: district.districtNumber,
              districtName: `District ${district.districtNumber}`,
            },
          ])
          .flat()
          .sort((a, b) => a.districtNumber - b.districtNumber);

        return districtSeries;
      }),
    ),
    { initialValue: null },
  );
}
