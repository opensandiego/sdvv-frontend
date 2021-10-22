import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
 
import { AboutComponent } from './components/about/about.component';
import { FaqComponent } from './components/faq/faq.component';
import { UnderConstructionComponent } from './components/under-construction/under-construction.component';
 
const routes: Routes = [
    { path: 'about', component: AboutComponent },
    { path: 'faq', component: FaqComponent },
    { path: 'under-construction', component: UnderConstructionComponent },
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
