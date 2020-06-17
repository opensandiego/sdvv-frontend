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
  FaqComponent,
  UnderConstructionComponent,
} from './components';


const routes: Routes = [
  { path: '', redirectTo: 'splash',pathMatch: 'full' },
  { path: 'splash', component: SplashComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'mayor', component: MayorComponent },
  { path: 'city-attorney', component: CityAttorneyComponent },
  { path: 'under-construction', component: UnderConstructionComponent },
  {
    path: 'city-council',
    component: CityCouncilComponent,
    children: [
      { path: 'district-one', component: DistrictOneComponent },
      { path: 'district-two', component: DistrictTwoComponent },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
