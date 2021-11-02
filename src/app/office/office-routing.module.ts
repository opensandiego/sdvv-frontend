import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OfficeComponent } from './components/office/office.component';


const routes: Routes = [
  {
    path: '',
    data: { breadcrumb: null },
    children: [
      {
        path: '',
        component: OfficeComponent,
        data: { isOffice: true, hasDistricts: false, isDistrict: false },
      },
      {
        path: ':candidateId',
        component: OfficeComponent,
        data: { isOffice: false, isCandidate: true },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OfficeRoutingModule { }
