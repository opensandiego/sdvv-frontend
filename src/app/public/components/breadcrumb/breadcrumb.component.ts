import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

import {MenuItem} from 'primeng/api';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent implements OnInit {
  items: MenuItem[];
  readonly home = {icon: 'pi pi-home', routerLink: '/'};
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  createBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: MenuItem[] = []): MenuItem[] {
    if (route.children.length < 1) {
      return breadcrumbs;
    }

    for (const child of route.children) {
      const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');

      if (routeURL !== '') {
        url += `/${routeURL}`;
      }

      let label: string;
      // const isOffice: boolean = child.snapshot.data['office'];
      const isDistrict: boolean = child.snapshot.data['district'];
      const isCandidate: boolean = child.snapshot.data['candidate'];

      if (isDistrict) {
        label = 'District ' + child.snapshot.params['district'];
      } else if (isCandidate) {
      } else {
        label = child.snapshot.data['breadcrumb'];
      }

      if (label) {
        breadcrumbs.push({label, routerLink: url});
      }

      return this.createBreadcrumbs(child, url, breadcrumbs);
    }
  }

  ngOnInit(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => this.items = this.createBreadcrumbs(this.activatedRoute.root))
  }
}
