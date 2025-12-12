import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faBalanceScale,
  faMapMarkedAlt,
  faUniversity,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';

import { SharedPipesModule } from '../shared/shared-pipes.module';
import { OfficeData, OfficeInfo } from '../lib-ui-components.models';

@Component({
  selector: 'office-card',
  imports: [
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    FontAwesomeModule,
    SharedPipesModule
],
  templateUrl: './office-card.component.html',
  styleUrls: ['./office-card.component.scss'],
})
export class OfficeCardComponent implements OnChanges {
  @Input() officeInfo: OfficeInfo;
  @Input() officeData: OfficeData;

  officeName: string = '-';
  defaultButtonText: string = 'See Candidates';
  disabledButtonText: string = 'No Candidates';
  isDisabled: boolean = true;
  buttonText: string = '';
  totalRaised: number = 0;
  totalRaisedInProgress: boolean = true;
  candidatesCount: number = 0;
  link: string = '';

  /**
   * For totalRaised and candidatesCount
   * 0 means there are no candidates so disable the amount.
   * null/undefined means that the amount has not yet been
   * determined and the value is pending.
   */

  private officeIconsMap = {
    mayor: faUniversity,
    'city attorney': faBalanceScale,
    'city council': faMapMarkedAlt,
    default: faTimes,
  };

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['officeInfo']) {
      const officeName = changes['officeInfo'].currentValue?.officeTitle;
      this.officeName = officeName ? officeName : '-';

      // Sample URL: http://localhost:4200/year/2020/office/mayor/0
      const link = officeName
        ? `office/${officeName.toLowerCase().split(' ').join('-')}/0`
        : '';

      const candidatesCount =
        changes['officeInfo'].currentValue?.candidateCount;
      this.candidatesCount = candidatesCount ? candidatesCount : 0;

      this.link = candidatesCount > 0 ? link : null;
      this.isDisabled = candidatesCount < 1;
      this.buttonText =
        candidatesCount > 0 ? this.defaultButtonText : this.disabledButtonText;
    }

    if (changes['officeData']) {
      const totalRaised =
        changes['officeData'].currentValue?.totalContributions;
      this.totalRaised = totalRaised ? totalRaised : 0;
      this.totalRaisedInProgress = !(totalRaised >= 0);
    }
  }

  getIcon(office?: string) {
    const icon = this.officeIconsMap[office.toLowerCase()];
    return icon ? icon : this.officeIconsMap['default'];
  }
}
