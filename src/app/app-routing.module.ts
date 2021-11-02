import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'office',
    data: { breadcrumb: null },
    children: [
      {
        path: 'mayor',
        loadChildren: () => import('./office/office.module').then(m => m.OfficeModule),
        data: { 
          officePath: 'mayor', officeName: 'Mayor', breadcrumb: 'Mayor'
        },
      },
      {
        path: 'city-attorney',
        loadChildren: () => import('./office/office.module').then(m => m.OfficeModule),
        data: { 
          officePath: 'city-attorney', officeName: 'City Attorney', breadcrumb: 'City Attorney' 
        },
      },
      {
        path: 'city-council',
        loadChildren: () => import('./office-districts/office-districts.module').then(m => m.OfficeDistrictsModule),
        data: {
          officePath: 'city-council', officeName: 'City Council', breadcrumb: 'City Council'
        },
      },
    ],
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
