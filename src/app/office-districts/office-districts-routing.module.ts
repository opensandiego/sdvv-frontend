import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OfficeDistrictComponent } from './components/office-districts/office-districts.component';
 
 
const routes: Routes = [
  {
    path: '',
    data: { breadcrumb: null },
    children: [
      {
        path: '',
        component: OfficeDistrictComponent,
        data: { office: true, breadcrumb: null },
      },
      {
        path: ':district',
        component: OfficeDistrictComponent,
        data: { district: true },
        // children: [
        //   {
        //     path: ':district/:candidateId',
        //     component: OfficeDistrictComponent,
        //     data: { candidate: true },
        //   },          
        // ]
      },  
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OfficeDistrictsRoutingModule { }
