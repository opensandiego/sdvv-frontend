import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
  SplashComponent,
  FaqComponent,
  AboutComponent,
  UnderConstructionComponent,
  OfficeComponent,
} from './components';


const routes: Routes = [
  { path: '', redirectTo: 'splash', pathMatch: 'full' },
  { path: 'splash', component: SplashComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'about', component: AboutComponent },
  { path: 'under-construction', component: UnderConstructionComponent },
  { path: ':office', component: OfficeComponent },
  { path: ':office/:candidateId', component: OfficeComponent },
  { path: '**', redirectTo: 'splash' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
