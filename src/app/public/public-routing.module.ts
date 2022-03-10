import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
 
import { AboutComponent } from './components/about/about.component';
import { FaqComponent } from './components/faq/faq.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SplashComponent } from './components/splash/splash.component';
import { UnderConstructionComponent } from './components/under-construction/under-construction.component';
import { OfficeSummaryComponent } from './components/office-summary/office-summary.component';
import { OfficeSummaryResolverService } from './resolvers/office-summary-resolver.service';
import { YearResolverService } from './resolvers/year-resolver.service';
import { YearRouteResolverService } from './resolvers/year-route-resolver.service';
 
const routes: Routes = [
  { 
    path: '',
    resolve: {
      year: YearResolverService,
    },
    children: [
      { path: 'home', component: SplashComponent, },
      { path: '', redirectTo: '/year/2022', pathMatch: 'full', },
      // { path: 'years', component: SplashComponent, children: [{ path: '', component: YearsComponent, }], },
    ]
  },
  { 
    path: 'year/:year',
    data: { type: 'year' },
    resolve: {
      office: OfficeSummaryResolverService,
    },
    children: [
      {
        path: '',
        data: { type: '' },
        component: SplashComponent,
        children: [
          {
            path: '',
            component: OfficeSummaryComponent,
          }
        ],
      },
      {
        path: 'office',
        data: { breadcrumb: null, startRoute: true, type: '' },
        loadChildren: () => import('../office/office.module').then(m => m.OfficeModule),
      }
    ],
  },
  { path: 'splash', redirectTo: '', pathMatch: 'full' },
  { path: 'about', component: AboutComponent },
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
