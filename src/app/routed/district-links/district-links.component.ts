import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

export type DistrictInput = {
  district: number;
};

@Component({
  selector: 'district-links',
  standalone: true,
  imports: [FontAwesomeModule, RouterModule],
  template: `
    <div>
      <div>See candidate breakdown by district:</div>

      <div class="district-links-container">
        @for (district of districts(); track $index) {
          <a
            class="compare-candidates-button"
            mat-flat-button
            [routerLink]="['./', district.district]"
          >
            District {{ district.district }}&nbsp;<fa-icon
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
  districts = input<DistrictInput[]>([]);

  faArrowRight = faArrowRight;
}
