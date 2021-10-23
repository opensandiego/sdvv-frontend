import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {} from './components';


const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
