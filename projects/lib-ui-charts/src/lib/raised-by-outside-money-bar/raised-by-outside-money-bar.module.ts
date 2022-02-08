import { NgModule } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';
import { RaisedByOutsideMoneyBarComponent } from './raised-by-outside-money-bar.component';


@NgModule({
  declarations: [
    RaisedByOutsideMoneyBarComponent,
  ],
  imports: [
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
  ],
  exports: [
    RaisedByOutsideMoneyBarComponent,
  ]
})
export class RaisedByOutsideMoneyBarModule { }
