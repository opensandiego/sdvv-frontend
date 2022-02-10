The Map component, within the MapBox Demo module, displays a map centered on San Diego. 

### Setup
* Check out the ```map-box-demo``` branch in git.
* Run npm install 
* Add a Mapbox access token to the following files
  ```src\environments\environment.db-remote.ts```
  ```src\environments\environment.ts```

  In each file replace the value of the ```mapboxToken``` property with a Mapbox access token.

  ```
  export const environment = {
    ...    
    mapboxToken: 'REPLACE_WITH_TOKEN',
  };

  ```
  You can learn more info on Mapbox access tokens from:
  https://docs.mapbox.com/help/getting-started/access-tokens/

* Edit the ```src\app\app.module.ts``` file and import the MapBoxModule and add the MapBoxModule to the NgModule imports for AppModule (see below). Important: add MapBoxModule above the PublicModule or else you will get a '404 Error Page Not Found'.

  ```
  // src\app\app.module.ts

  // Near the top add the following line:
  import { MapBoxModule } from './mapbox-demo/mapbox-demo.module';

  ...

    imports: [
      ...
      MapBoxModule, //  <- add
      PublicModule,
      ...
    ],
  ```

When the setup is complete and the application is running the map can be viewed at:

* http://localhost:4200/sd-map

### Extras
To change the path edit ```src\app\mapbox-demo\mapbox-demo-routing.module.ts``` and replace the path.

To experiment you can edit the Map component or duplicate it and make changes to it.

### Duplicate the Map component 
* To duplicate make a copy of the ```src\app\mapbox-demo\map``` folder and then rename the folder. 
* Edit the ```./newFolderName/map.component.ts``` file and change the MapComponent name on line ```export class MapComponent implements OnInit```
* Import the component into a module such as the MapBoxModule in the same way the MapComponent is imported and listed in the module.
* Edit ```src\app\mapbox-demo\mapbox-demo-routing.module.ts``` and add a new element to the Routes array. Change the element to the desired path and target component.

### References
* https://github.com/Wykks/ngx-mapbox-gl
* https://docs.mapbox.com/mapbox-gl-js/guides/

Note: The packages used for Mapbox have been added to the dev branch and are not specific to the ```map-box-demo``` branch.