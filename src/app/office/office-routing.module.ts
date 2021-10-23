import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OfficeComponent } from './components/office/office.component';
 
 
const routes: Routes = [
  { path: 'office/:office', component: OfficeComponent },
  { path: 'office/:office/:candidateId', component: OfficeComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OfficeRoutingModule { }
