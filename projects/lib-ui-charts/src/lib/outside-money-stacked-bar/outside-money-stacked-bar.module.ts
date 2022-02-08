import { NgModule } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';
import { OutsideMoneyStackedBarComponent } from './outside-money-stacked-bar.component';

@NgModule({
  declarations: [
    OutsideMoneyStackedBarComponent,
  ],
  imports: [
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
  ],
  exports: [
    OutsideMoneyStackedBarComponent,
  ]
})
export class OutsideMoneyStackedBarModule { }
