import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
  CityAttorneyComponent,
  MayorComponent,
  SplashComponent,
  FaqComponent,
  AboutComponent,
  UnderConstructionComponent,
  CouncilDistrictOneComponent,
  CouncilDistrictThreeComponent,
  CouncilDistrictFiveComponent,
  CouncilDistrictSevenComponent,
  CouncilDistrictNineComponent,
} from './components';


const routes: Routes = [
  { path: '', redirectTo: 'splash', pathMatch: 'full' },
  { path: 'splash', component: SplashComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'about', component: AboutComponent },
  { path: 'mayor', component: MayorComponent },
  { path: 'city-attorney', component: CityAttorneyComponent },
  { path: 'under-construction', component: UnderConstructionComponent },
  { path: 'city-council-district-1', component: CouncilDistrictOneComponent },
  { path: 'city-council-district-3', component: CouncilDistrictThreeComponent },
  { path: 'city-council-district-5', component: CouncilDistrictFiveComponent },
  { path: 'city-council-district-7', component: CouncilDistrictSevenComponent },
  { path: 'city-council-district-9', component: CouncilDistrictNineComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
