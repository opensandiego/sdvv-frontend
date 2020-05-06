import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { 
  CityAttorneyComponent,
  CityCouncilComponent,
  DistrictOneComponent,
  DistrictTwoComponent,
  HomeComponent,
  MayorComponent,
  SplashComponent,
  UnderConstructionComponent,
} from './components';


const routes: Routes = [


  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: 'splash', component: SplashComponent,  outlet: 'sidenav'},
      { path: 'mayor', component: MayorComponent, outlet: 'sidenav' },
      { path: 'city-attorney', component: CityAttorneyComponent, outlet: 'sidenav' },
      {
        path: 'city-council',
        component: CityCouncilComponent,
        outlet: 'sidenav',
        children: [
          { path: 'district-one', component: DistrictOneComponent },
          { path: 'district-two', component: DistrictTwoComponent },
        ],
      },
    ],
  },
  { path: 'under-construction', component: UnderConstructionComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
