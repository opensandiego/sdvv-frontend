import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [
    RouterModule,
  ],
  selector: 'app-summary-container',
  template: `
    <div class="summary-container-area">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    .summary-container-area {
      padding: 20px 40px 0px 30px;
    }
  `],
})
export class SummaryContainerComponent {

  constructor(
  ) { }
}
