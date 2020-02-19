import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import { SplashPageComponent } from './components/splash-page/splash-page.component';

const routes: Routes = [
  // { path: '', redirectTo: 'splash', pathMatch: 'full' },
  // { path: 'splash', component: SplashPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
