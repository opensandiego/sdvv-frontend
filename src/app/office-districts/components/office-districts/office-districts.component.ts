import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'office-districts',
  templateUrl: './office-districts.component.html',
  styleUrls: ['./office-districts.component.scss'],
})
export class OfficeDistrictComponent implements OnInit {
  office: string;
  district: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    // console.log('OfficeDistrictComponent');

    // this.route.data.subscribe(data => {
    //   console.log('OD data.officePath', data.officePath);
    //   this.office = data.officePath;
    // })

    // this.route.paramMap.subscribe(params => {
    //   console.log('OD params', params);
    //   this.district = params.get('district')
    //   console.log('OD this.district', this.district);
    // })
  }

}
