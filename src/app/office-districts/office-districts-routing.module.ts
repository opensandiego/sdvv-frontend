import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OfficeDistrictComponent } from './components/office-districts/office-districts.component';
import { QuickViewContainerComponent } from './components/quick-view-container/quick-view-container.component';
 
 
const routes: Routes = [
  {
    path: '',
    data: { breadcrumb: null, officeName: 'City Council' },
    children: [
      {
        path: '',
        component: OfficeDistrictComponent,
        data: { office: true, breadcrumb: null },
      },
      {
        path: ':district',
        component: OfficeDistrictComponent,
        data: { district: true, isDistrict: true, isOffice: false, hasDistricts: false, },
        children: [
          {
            path: ':candidateId',
            component: QuickViewContainerComponent,
            data: { candidate: true, isCandidate: true, isDistrict: false,},
          },          
        ]
      },  
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OfficeDistrictsRoutingModule { }
