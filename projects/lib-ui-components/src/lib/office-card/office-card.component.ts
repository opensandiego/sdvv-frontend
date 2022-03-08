import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { OfficeData, OfficeInfo } from '../lib-ui-components.models';

@Component({
  selector: 'office-card',
  templateUrl: './office-card.component.html',
  styleUrls: ['./office-card.component.scss']
})
export class OfficeCardComponent implements OnChanges {
  @Input() officeInfo: OfficeInfo;
  @Input() officeData: OfficeData;

  officeName: string = '-';
  totalRaised: number = 0;
  candidatesCount: number = 0;
  link: string = '';

/**
 * The icons used below must be imported in the module and
 * injected in the module's constructor. The imported icon 
 * names are similar but not exactly the same as those
 * used in library.addIcons().
 */   
  private officeIconsMap = {
    'mayor': 'university',
    'city attorney': 'balance-scale',
    'city council': 'map-marked-alt',
    'default': 'question',
  }

  constructor( ) { }

  ngOnChanges(changes: SimpleChanges): void {
    console.log({ changes })

    if (changes['officeInfo']) {
      const officeName = changes['officeInfo'].currentValue?.officeTitle; 
      this.officeName = officeName ? officeName : '-';
      
      // Sample URL: http://localhost:4200/year/2020/office/mayor/0
      this.link = officeName ? `office/${officeName.toLowerCase().split(' ').join('-')}/0` : '';

      const candidatesCount = changes['officeInfo'].currentValue?.candidateCount
      this.candidatesCount = candidatesCount ? candidatesCount : 0;
    }
    
    if (changes['officeData']) {
      const totalRaised = changes['officeData'].currentValue?.totalContributions;
      this.totalRaised = totalRaised ? totalRaised : 0;
    }
  }

  getIcon(office?: string) {
    const icon = this.officeIconsMap[office.toLowerCase()];
    return icon ? icon : this.officeIconsMap['default'];
  }
}
