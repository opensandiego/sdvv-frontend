import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CandidateNavigationComponent } from './components/candidate-navigation/candidate-navigation.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';


@NgModule({
  declarations: [
    CandidateNavigationComponent,
  ],
  imports: [
    CommonModule,
    MatExpansionModule,
    MatListModule,
  ],
  exports: [
    CandidateNavigationComponent,
  ]
})
export class NavigationMenuModule { }
