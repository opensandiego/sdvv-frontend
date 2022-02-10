import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyLibMapModule } from './mapbox-lib';
import { environment } from 'src/environments/environment';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';

import { MapComponent } from './map/map.component';
import { MapBoxRoutingModule } from './mapbox-demo-routing.module';


@NgModule({
  declarations: [
    MapComponent,
  ],
  imports: [
    CommonModule,
    MapBoxRoutingModule,
    MyLibMapModule.forRoot({
      mapboxToken: environment.mapboxToken,
    }),
    NgxMapboxGLModule,
  ],
  exports: [
    MapComponent,
  ],
  providers: []
})
export class MapBoxModule {}
