import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
 
import { YearRouteResolverService } from './resolvers/year-route-resolver.service';
 
export const PUBLIC_ROUTES: Routes = [
  { 
    path: '',
    resolve: {
      year: YearRouteResolverService,
    },
    children: [
      { path: 'home', redirectTo: '/years', pathMatch: 'full', },
      { path: '', redirectTo: '/year/2022', pathMatch: 'full', },
      { path: 'years',
        loadChildren: () => import('./years-routing.module').then(m => m.YearsRoutingModule),
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
        loadChildren: () => import('./offices-routing.module').then(m => m.OfficesRoutingModule),
      },
      {
        path: 'office',
        data: { breadcrumb: null, startRoute: true, type: '' },
        loadChildren: () => import('./office-routes').then(mod => mod.DISTRICT_OFFICE_ROUTES),
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

@NgModule({
  imports: [RouterModule.forChild(PUBLIC_ROUTES)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
