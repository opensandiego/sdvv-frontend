import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AboutVotersVoiceComponent } from '../about-voters-voice/about-voters-voice.component';

@Component({
  standalone: true,
  imports: [
    RouterModule,
    AboutVotersVoiceComponent,
  ],
  selector: 'app-summary-content',
  template: `
    <div class="summary-content-area">
      <about-voters-voice></about-voters-voice>
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    .summary-content-area {
      padding: 20px 40px 0px 30px;
    }
  `],
})
export class SummaryContentComponent {

  constructor(
  ) { }
}
