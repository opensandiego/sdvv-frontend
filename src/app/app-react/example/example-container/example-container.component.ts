import { Component } from "@angular/core";

@Component({
  selector: 'example-container-for-wrapper-component',
  template: `
    <div id="myReactComponentContainer">
      <angular-wrapper-for-react-component
        [counter]="counter"
        (componentClick)="handleOnClick($event)"
      ></angular-wrapper-for-react-component>     
      <div>Div in the Angular container component</div> 
    </div>
  `,
})
export class ExampleContainerComponent {
  
  public counter = 21;

  public handleOnClick(stateCounter: number) {
    this.counter++;
  }
}
