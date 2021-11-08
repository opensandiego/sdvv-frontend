import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailsComponent } from '../candidate-details/details/details.component';
import { OfficeDistrictComponent } from './components/office-districts/office-districts.component';
import { QuickViewContainerComponent } from './components/quick-view-container/quick-view-container.component';
import { OfficeDistrictResolverService } from './office-district-resolver.service';

const officeRoutes: Routes = [
  {
    path: '',
    component: OfficeDistrictComponent,
    data: { type: '' },
    children: [
      {
        path: ':candidateId',
        data: { type: 'candidate' },
        component: QuickViewContainerComponent,
      }
    ],
  },
  {
    path: ':candidateId',
    data: { type: 'candidate' },
    children: [
      {
        path: 'details',
        component: DetailsComponent,
        data: { type: 'details' },
      },
    ],
  }, 
];

const districts: Routes = [
  {
    path: ':district_number',
    data: { type: 'district' },
    children: officeRoutes,
    resolve: {
      office: OfficeDistrictResolverService,
    },
  },
];

const routes: Routes = [
  {
    path: 'city-council/0',
    redirectTo: 'city-council/1',
    pathMatch: 'full',
  },
  {
    path: ':office_name',
    children: districts,
    data: { 
      type: 'office_prefix',
    },
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OfficeRoutingModule { }
