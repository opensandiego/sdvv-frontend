import { NgModule } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';

import { RaisedVsSpentBarComponent } from './raised-vs-spent-bar.component';

@NgModule({
  declarations: [
    RaisedVsSpentBarComponent,
  ],
  imports: [
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
  ],
  exports: [
    RaisedVsSpentBarComponent,
  ],
  providers: []
})
export class RaisedVsSpentBarModule { }
