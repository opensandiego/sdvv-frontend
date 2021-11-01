import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OfficeDistrictsRoutingModule } from './office-districts-routing.module';
import { OfficeDistrictComponent } from './components/office-districts/office-districts.component';


@NgModule({
  declarations: [
    OfficeDistrictComponent,
  ],
  imports: [
    CommonModule,
    OfficeDistrictsRoutingModule,
  ],
  exports: [
  ]
})
export class OfficeDistrictsModule { }
