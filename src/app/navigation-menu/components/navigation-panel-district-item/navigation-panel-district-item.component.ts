import { Component, Input, OnInit } from '@angular/core';
import { RoutingService } from 'src/app/public/services/routing.service';
import { District } from '../../interfaces/district';

@Component({
  selector: 'navigation-panel-district-item',
  templateUrl: './navigation-panel-district-item.component.html',
})
export class NavigationPanelDistrictItemComponent implements OnInit {
  @Input() district: District;
  route: string;
  districtName: string;
  isSelected: boolean;

  constructor(
    private routingService: RoutingService,
  ) { }

  ngOnInit(): void {
    this.route = this.routingService.getDistrictRoute(this.district);
    this.districtName = `District ${this.district.district_number}`;
  }

  setSelectedDistrict(status: boolean) {
    this.isSelected = status;
  }

  changeRoute() {
    console.log('district changeRoute called', `${this.route}`);
  }
}
