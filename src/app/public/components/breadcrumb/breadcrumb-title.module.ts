import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { BreadcrumbComponent } from './breadcrumb.component';
import { RouterModule } from '@angular/router';
import { TitleMetaTagService } from './title-meta-tag.service';

@NgModule({
  declarations: [
    BreadcrumbComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    BreadcrumbModule,
  ],
  exports: [
    BreadcrumbComponent,
  ],
  providers: [TitleMetaTagService],
})
export class BreadcrumbTitleModule { }
