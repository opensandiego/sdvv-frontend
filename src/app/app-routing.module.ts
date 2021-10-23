import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
  SplashComponent,
  OfficeComponent,
} from './components';


const routes: Routes = [
  { path: '', redirectTo: 'splash', pathMatch: 'full' },
  { path: 'splash', component: SplashComponent },
  { path: ':office', component: OfficeComponent },
  { path: ':office/:candidateId', component: OfficeComponent },
  { path: '**', redirectTo: 'splash' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
