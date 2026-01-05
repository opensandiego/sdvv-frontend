import { Component, OnInit } from '@angular/core';
import { LastUpdatedComponent } from '../../graphql/last-updated/last-updated.component';

@Component({
  selector: 'footer',
  imports: [LastUpdatedComponent],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {}
