import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { WrapperReactComponentModule } from "../react-component/wrapper.module";
import { ExampleContainerComponent } from "./example-container.component";

@NgModule({
  declarations: [ ExampleContainerComponent ],
  exports: [ ExampleContainerComponent ],
  imports: [ CommonModule, WrapperReactComponentModule ],
  schemas: []
})
export class ExampleContainerModule {}
