import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DistrictRedirectResolverService } from './district-redirect-resolver.service';

const officeRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('../components/office-districts/office-districts.component').then(mod => mod.OfficeDistrictComponent),
    data: { type: '' },
    loadChildren: () => import('../routed/candidate-summary-routed/candidate-summary-routed.module').then(m => m.CandidateSummaryRoutedModule),
  },
  {
    path: ':candidateId',
    data: { type: 'candidate' },
    loadChildren: () => import('../routed/candidate-details-routed/candidate-details-routed.module').then(m => m.CandidateDetailsRoutedModule),
  }, 
];

const districts: Routes = [
  {
    path: ':district_number',
    data: { type: 'district' },
    children: officeRoutes,
    resolve: {
      office: DistrictRedirectResolverService,
    },
  },
];

const routes: Routes = [
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
