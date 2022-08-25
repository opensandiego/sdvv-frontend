import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
 
import { FaqComponent } from './components/faq/faq.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { UnderConstructionComponent } from './components/under-construction/under-construction.component';
import { YearRouteResolverService } from './resolvers/year-route-resolver.service';
 
const routes: Routes = [
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
        loadChildren: () => import('../office/office.module').then(m => m.OfficeModule),
      }
    ],
  },
  { path: 'splash', redirectTo: '', pathMatch: 'full' },
  {
    path: 'about',
    loadComponent: () => import('../components/about/about.component').then(mod => mod.AboutComponent)
  },
  { path: 'faq', component: FaqComponent },
  { path: 'under-construction', component: UnderConstructionComponent },
  { path: '404', component: NotFoundComponent },
  { path: '**', pathMatch: 'full', redirectTo: '404' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
