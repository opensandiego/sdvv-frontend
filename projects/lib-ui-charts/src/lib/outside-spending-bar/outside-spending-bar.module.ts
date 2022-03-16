import { NgModule } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';
import { OutsideSpendingBarComponent } from './outside-spending-bar.component';

@NgModule({
  declarations: [
    OutsideSpendingBarComponent,
  ],
  imports: [
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
  ],
  exports: [
    OutsideSpendingBarComponent,
  ]
})
export class OutsideSpendingBarModule { }
