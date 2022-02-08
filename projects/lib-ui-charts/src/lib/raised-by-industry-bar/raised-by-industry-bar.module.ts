import { NgModule } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';
import { RaisedByIndustryBarComponent } from './raised-by-industry-bar.component';

@NgModule({
  declarations: [
    RaisedByIndustryBarComponent,
  ],
  imports: [
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
  ],
  exports: [
    RaisedByIndustryBarComponent,
  ]
})
export class RaisedByIndustryBarModule { }
