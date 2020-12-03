import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
  CityAttorneyComponent,
  MayorComponent,
  SplashComponent,
  FaqComponent,
  AboutComponent,
  UnderConstructionComponent,
  CityCouncilDistrictComponent,
} from './components';


const routes: Routes = [
  { path: '', redirectTo: 'splash', pathMatch: 'full' },
  { path: 'splash', component: SplashComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'about', component: AboutComponent },
  { path: 'mayor', component: MayorComponent },
  { path: 'city-attorney', component: CityAttorneyComponent },
  { path: 'under-construction', component: UnderConstructionComponent },
  { path: 'city-council/district/:id', component: CityCouncilDistrictComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
