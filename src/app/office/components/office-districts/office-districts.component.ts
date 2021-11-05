import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'office-districts',
  templateUrl: './office-districts.component.html',
  styleUrls: ['./office-districts.component.scss'],
})
export class OfficeDistrictComponent implements OnInit {
  office: string;
  district: string;

  constructor(
  ) { }

  ngOnInit(): void {
  }

}
