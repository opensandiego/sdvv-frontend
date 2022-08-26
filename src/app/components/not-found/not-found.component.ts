import { Component, OnInit } from '@angular/core';

@Component({
  standalone: true,
  selector: 'not-found',
  templateUrl: './not-found.component.html',
})
export class NotFoundComponent implements OnInit {

  constructor(
  ) { }

  ngOnInit(): void {
    console.log('NotFoundComponent')
  }

}
