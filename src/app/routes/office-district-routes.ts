import { Routes } from '@angular/router';
import { DistrictRedirectResolverService } from '../public/resolvers/district-redirect-resolver.service';

const officeRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('../components/office-districts/office-districts.component').then(
        (mod) => mod.OfficeDistrictComponent,
      ),
    data: { type: '' },
  },
  {
    path: ':candidateId',
    data: { type: 'candidate' },
    children: [
      {
        path: '',
        data: { type: '' },
        loadComponent: () =>
          import('../routed/candidate-summary-routed/candidate-summary-routed.component').then(
            (m) => m.CandidateSummaryRoutedComponent,
          ),
      },
      {
        path: 'details',
        data: { type: 'details' },
        loadComponent: () =>
          import('../routed/candidate-details-routed/candidate-details-routed.component').then(
            (m) => m.CandidateDetailsRoutedComponent,
          ),
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
      office: DistrictRedirectResolverService,
    },
  },
];

export const OFFICE_DISTRICT_ROUTES: Routes = [
  {
    path: ':office_name',
    children: districts,
    data: {
      type: 'office_prefix',
    },
  },
];
