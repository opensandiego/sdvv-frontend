import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OfficeDistrictComponent } from './components/office-districts/office-districts.component';
import { QuickViewContainerComponent } from './components/quick-view-container/quick-view-container.component';


const routes: Routes = [
  {
    path: '',
    data: { breadcrumb: null },
    children: [
      {
        path: '',
        // component: OfficeDistrictComponent,
        data: { isOffice: true, hasDistricts: true, breadcrumb: null },
      },
      {
        path: ':district',
        component: OfficeDistrictComponent,
        data: { district: true, isDistrict: true, isOffice: false, hasDistricts: false, },
        children: [
          {
            path: ':candidateId',
            component: QuickViewContainerComponent,
            data: { isCandidate: true, isDistrict: false, },
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OfficeDistrictsRoutingModule { }
