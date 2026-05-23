import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  imports: [RouterModule],
  selector: 'data-sources',
  template: `
    <div class="sources">
      <p>
        All of our data is sourced directly from the
        <a href="https://efile.sandiego.gov/" target="_blank"
          >City of San Diego Electronic Filing System.</a
        >
      </p>
    </div>
  `,
  styleUrls: [`./data-sources.component.scss`]
})
export class DataSourcesComponent {}
