import { Component } from '@angular/core';

@Component({
  selector: 'splash',
  template: `
    <div class="splashpage">
      <splash-hero></splash-hero>
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    .splashpage {
      padding: 20px 40px 0px 30px;
    }
  `]
})
export class SplashComponent { }
