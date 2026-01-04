import { Routes } from '@angular/router';

import { YearRouteResolverService } from '../public/resolvers/year-route-resolver.service';

export const MAIN_ROUTES: Routes = [
  {
    path: '',
    resolve: {
      year: YearRouteResolverService,
    },
    children: [
      { path: 'home', redirectTo: '/years', pathMatch: 'full', },
      { path: '', redirectTo: '/year/2026', pathMatch: 'full', },
      { path: 'years',
        loadChildren: () => import('./year-summary-routes').then(mod => mod.YEAR_SUMMARY_ROUTES),
      },
    ]
  },
  {
    path: 'year/:year',
    data: { type: 'year' },
    resolve: {
      year: YearRouteResolverService,
    },
    children: [
      {
        path: '',
        data: { type: '' },
        loadChildren: () => import('./offices-routes').then(mod => mod.OFFICE_ROUTES),
      },
      {
        path: 'office',
        data: { breadcrumb: null, startRoute: true, type: '' },
        loadChildren: () => import('./office-district-routes').then(mod => mod.OFFICE_DISTRICT_ROUTES),
      }
    ],
  },
  { path: 'splash', redirectTo: '', pathMatch: 'full' },
  {
    path: 'about',
    loadComponent: () => import('../components/about/about.component').then(mod => mod.AboutComponent)
  },
  {
    path: 'faq',
    loadComponent: () => import('../components/faq/faq.component').then(mod => mod.FaqComponent)
  },
  {
    path: 'under-construction',
    loadComponent: () => import('../components/under-construction/under-construction.component').then(mod => mod.UnderConstructionComponent)
  },
  {
    path: '404',
    loadComponent: () => import('../components/not-found/not-found.component').then(mod => mod.NotFoundComponent)
  },
  { path: '**', pathMatch: 'full', redirectTo: '404' },
];
