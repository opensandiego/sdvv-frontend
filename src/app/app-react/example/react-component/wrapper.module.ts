import { CommonModule } from "@angular/common";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { WrapperCustomReactComponent } from "./wrapper-CustomReactComponent";

@NgModule({
  declarations: [ WrapperCustomReactComponent ],
  exports: [ WrapperCustomReactComponent ],
  imports: [ CommonModule ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class WrapperReactComponentModule {}
