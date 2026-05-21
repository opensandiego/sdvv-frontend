import {
  Component,
  ElementRef,
  ViewChild,
  type AfterViewInit,
  type OnDestroy,
  inject,
  PLATFORM_ID,
  input,
  output,
  effect,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import * as echarts from 'echarts';

@Component({
  standalone: true,
  selector: 'angular-echarts',
  template: `
    <div
      #chartContainer
      [style.width]="width()"
      [style.height]="height()"
    ></div>
  `,
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
})
export class AngularEChartWrapperComponent implements AfterViewInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);

  @ViewChild('chartContainer') chartContainer!: ElementRef;

  options = input<echarts.EChartsOption>({});
  width = input('100%');
  height = input('400px');
  loading = input<boolean>(false);

  chartClick = output<any>();

  private chart: echarts.ECharts | null = null;
  private resizeHandler = () => this.chart?.resize();

  constructor() {
    effect(() => {
      const currentOptions = this.options();
      const currentHeight = this.height();
      const isLoading = this.loading();

      if (this.chart) {
        // Toggle ECharts loading overlay
        if (isLoading) {
          this.chart.showLoading();
        } else {
          this.chart.hideLoading();
          this.chart.setOption(currentOptions, { notMerge: true });
        }

        requestAnimationFrame(() => {
          this.chart?.resize();
        });
      }
    });
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.chart = echarts.init(this.chartContainer.nativeElement);
      this.chart.setOption(this.options());

      // listen for ECharts 'click' events and emit via the output
      this.chart.on('click', (params) => {
        this.chartClick.emit(params);
      });

      window.addEventListener('resize', this.resizeHandler);
    }
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId)) {
      window.removeEventListener('resize', this.resizeHandler);
      this.chart?.off('click');
      this.chart?.dispose();
    }
  }
}
