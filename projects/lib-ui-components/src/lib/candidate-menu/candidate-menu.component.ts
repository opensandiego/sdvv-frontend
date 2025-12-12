import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { PanelMenu } from 'primeng/panelmenu';
import { ActiveMenuPath } from '../lib-ui-components.models';
import { Office } from './office';

@Component({
  selector: 'candidate-menu',
  imports: [MenuModule, PanelMenu],
  template: `
    <p-panelMenu
      [model]="items"
      [style]="{ width: '200px' }"
      [multiple]="false"
    ></p-panelMenu>
  `,
  styleUrls: ['./candidate-menu.component.scss'],
})
export class CandidateMenuComponent implements OnChanges {
  @Input() activeItem: ActiveMenuPath;
  @Input() detailsActive: boolean;

  @Input() mayor;
  @Input() cityCouncil;
  @Input() cityAttorney;

  mayorOffice: Office;
  cityCouncilOffice: Office;
  cityAttorneyOffice: Office;

  items: MenuItem[];

  constructor() {
    this.mayorOffice = new Office('Mayor', 'fa fa-fw fa-university');
    this.cityCouncilOffice = new Office('City Council', 'fa fa-fw fa-map');
    this.cityAttorneyOffice = new Office(
      'City Attorney',
      'fa fa-fw fa-balance-scale'
    );

    this.renderMenu();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['detailsActive']) {
      this.detailsActive = changes['detailsActive'].currentValue;
      this.mayorOffice.addRouterLinks(this.detailsActive);
      this.cityCouncilOffice.addRouterLinks(this.detailsActive);
      this.cityAttorneyOffice.addRouterLinks(this.detailsActive);
    }

    if (changes['mayor']) {
      const change = changes['mayor'];
      const office = this.mayorOffice;

      this.changeOffice(office, change);
    }

    if (changes['cityCouncil']) {
      const change = changes['cityCouncil'];
      const office = this.cityCouncilOffice;

      this.changeOffice(office, change);
    }

    if (changes['cityAttorney']) {
      const change = changes['cityAttorney'];
      const office = this.cityAttorneyOffice;

      this.changeOffice(office, change);
    }

    this.renderMenu();
  }

  changeOffice(office: Office, officeChange) {
    if (
      officeChange?.currentValue &&
      officeChange.currentValue?.candidates?.length > 0
    ) {
      const year = officeChange.currentValue?.electionYear;
      const candidates = officeChange.currentValue?.candidates;

      office.setCandidates(candidates);
      office.addRouterLinks(this.detailsActive);
      office.year = year;
      office.setEnabled();
    } else {
      office.setDisabled();
    }
  }

  renderMenu() {
    this.items = [
      this.mayorOffice.toMenuItem(this.activeItem),
      this.cityCouncilOffice.toMenuItem(this.activeItem),
      this.cityAttorneyOffice.toMenuItem(this.activeItem),
    ];
  }
}
