import { NgModule } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';
import { SupportOpposeBarComponent } from './support-oppose-bar.component';

@NgModule({
  declarations: [
    SupportOpposeBarComponent,
  ],
  imports: [
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
  ],
  exports: [
    SupportOpposeBarComponent,
  ]
})
export class SupportOpposeBarModule { }
