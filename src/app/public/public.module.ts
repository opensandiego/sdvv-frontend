import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './components/about/about.component';
import { FaqComponent } from './components/faq/faq.component';
import { UnderConstructionComponent } from './components/under-construction/under-construction.component';
import { PublicRoutingModule } from './public-routing.module';



@NgModule({
  declarations: [
    AboutComponent,
    FaqComponent,
    UnderConstructionComponent,
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
  ],
  exports: [
    AboutComponent,
    FaqComponent,
    UnderConstructionComponent,    
  ]
})
export class PublicModule { }
