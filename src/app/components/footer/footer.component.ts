import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DataSourcesComponent } from 'src/app/components/data-sources/data-sources.component';

@Component({
  selector: 'footer',
  imports: [RouterLink, DataSourcesComponent],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {}
