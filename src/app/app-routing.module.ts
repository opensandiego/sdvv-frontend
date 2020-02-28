import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { 
  CityAttorneyComponent,
  CityCouncilComponent,
  HomeComponent,
  MayorComponent,
  SplashComponent,
} from './components';


const routes: Routes = [
  { path: '', redirectTo: 'splash', pathMatch: 'full' },
  { path: 'splash', component: SplashComponent },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: 'city-attorney', component: CityAttorneyComponent, outlet: 'sidenav' },
      { path: 'city-council', component: CityCouncilComponent, outlet: 'sidenav' },
      { path: 'mayor', component: MayorComponent, outlet: 'sidenav' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
