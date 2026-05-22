import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LastUpdatedComponent } from 'src/app/graphql/last-updated/last-updated.component';

@Component({
  imports: [RouterModule, LastUpdatedComponent],
  selector: 'data-sources',
  template: `
    <div class="sources">
      <p>
        All of our data is sourced directly from the
        <a href="https://efile.sandiego.gov/" target="_blank"
          >City of San Diego Electronic Filing System.</a
        >
      </p>
      <last-updated></last-updated>
    </div>
  `,
  styleUrls: [`./data-sources.component.scss`]
})
export class DataSourcesComponent {}
