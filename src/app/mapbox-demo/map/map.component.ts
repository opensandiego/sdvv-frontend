import { Component, OnInit } from '@angular/core';
import { Map } from 'mapbox-gl';

@Component({
  selector: 'map-demo',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  center = [-117.21, 32.82];
  zoom = [9];
  mapStyle = 'mapbox://styles/mapbox/streets-v9';
  map: Map;

  url = 'assets/council_districts_datasd.geojson'

  constructor(
  ) { }

  ngOnInit(): void {
    console.log('MapComponent ngOnInit')
  }

}
