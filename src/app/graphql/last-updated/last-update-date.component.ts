import { DatePipe } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'last-update-date',
  imports: [DatePipe],
  template: `
    <div class="updated">
      Last updated: {{ lastUpdatedDate | date: 'MMMM d, y' }}
    </div>
  `,
  styles: `
    .updated {
      font-size: 0.9em;
      color: #00000088;
    }
  `,
})
export class LastUpdateDateComponent {
  year = input<string>();
  lastUpdatedDate = new Date(); // add service
}
