import { NgModule } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';
import { TotalRaisedBarComponent } from './total-raised-bar.component';


@NgModule({
  declarations: [
    TotalRaisedBarComponent,
  ],
  imports: [
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
  ],
  exports: [
    TotalRaisedBarComponent,
  ]
})
export class TotalRaisedBarModule { }
