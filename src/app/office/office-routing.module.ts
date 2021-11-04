import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailsComponent } from '../candidate-details/details/details.component';
import { OfficeDistrictComponent } from './components/office-districts/office-districts.component';
import { QuickViewContainerComponent } from './components/quick-view-container/quick-view-container.component';

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
        data: { type: 'details', hasCandidates: false },
      },
    ],
  }, 
];

const routesWithDistricts: Routes = [
  {
    path: '',
    data: { breadcrumb: null },
    // component: , // future district map component 
    children: [
      {
        path: ':district',
        data: { type: 'district', hasCandidates: true },
        children: officeRoutes,
      },
    ],
  },
];

const routesWithoutDistricts: Routes = [
  {
    path: '',
    data: { type: 'office', hasCandidates: true, breadcrumb: null },
    children: officeRoutes,
  },
];

const routes: Routes = [
  {
    path: 'mayor',
    data: { 
      officePath: 'mayor', officeName: 'Mayor', breadcrumb: 'Mayor'
    },
    children: routesWithoutDistricts,
  },
  {
    path: 'city-attorney',
    data: { 
      officePath: 'city-attorney', officeName: 'City Attorney', breadcrumb: 'City Attorney' 
    },
    children: routesWithoutDistricts,
  },
  {
    path: 'city-council',
    data: {
      officePath: 'city-council', officeName: 'City Council', breadcrumb: 'City Council'
    },
    children: routesWithDistricts,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OfficeRoutingModule { }
