import { NgModule } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';
import { ContributionsByCodeStackedBarComponent } from './contributions-by-code-stacked-bar.component';


@NgModule({
  declarations: [
    ContributionsByCodeStackedBarComponent,
  ],
  imports: [
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
  ],
  exports: [
    ContributionsByCodeStackedBarComponent,
  ]
})
export class ContributionsByCodeStackedBarModule { }
