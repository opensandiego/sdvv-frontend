import { NgModule } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';
import { RaisedByLocationBarComponent } from './raised-by-location-bar.component';

@NgModule({
  declarations: [
    RaisedByLocationBarComponent,
  ],
  imports: [
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
  ],
  exports: [
    RaisedByLocationBarComponent,
  ]
})
export class RaisedByLocationBarModule { }
