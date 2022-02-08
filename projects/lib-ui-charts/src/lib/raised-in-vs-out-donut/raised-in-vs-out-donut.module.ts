import { NgModule } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';

import { RaisedInVsOutDonutComponent } from './raised-in-vs-out-donut.component';

@NgModule({
  declarations: [
    RaisedInVsOutDonutComponent,
  ],
  imports: [
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
  ],
  exports: [
    RaisedInVsOutDonutComponent,
  ],
  providers: []
})
export class RaisedInVsOutDonutModule { }
