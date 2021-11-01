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
      data: { isOffice: true, breadcrumb: null },
    },
    {
      path: ':candidateId',
      component: OfficeComponent,
    },    
  ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OfficeRoutingModule { }
