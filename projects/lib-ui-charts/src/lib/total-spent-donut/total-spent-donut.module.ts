import { NgModule } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';

import { TotalSpentDonutComponent } from './total-spent-donut.component';

@NgModule({
  declarations: [
    TotalSpentDonutComponent,
  ],
  imports: [
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
  ],
  exports: [
    TotalSpentDonutComponent,
  ],
  providers: []
})
export class TotalSpentDonutModule { }
