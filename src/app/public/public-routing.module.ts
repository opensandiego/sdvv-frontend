import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
 
import { AboutComponent } from './components/about/about.component';
import { FaqComponent } from './components/faq/faq.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SplashComponent } from './components/splash/splash.component';
import { UnderConstructionComponent } from './components/under-construction/under-construction.component';
 
const routes: Routes = [
    { path: '', component: SplashComponent },
    { path: 'splash', redirectTo: '', pathMatch: 'full' },
    { path: 'about', component: AboutComponent },
    { path: 'faq', component: FaqComponent },
    { path: 'under-construction', component: UnderConstructionComponent },
    { path: '404', component: NotFoundComponent },
    { path: '**', pathMatch: 'full', redirectTo: '404' },
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
