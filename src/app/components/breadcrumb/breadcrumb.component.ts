import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { MenuItem } from 'primeng/api';
import { CandidateCardInfoGQL } from './candidate-card-info-gql.query';
import { TitleMetaTagService } from './title-meta-tag.service';
import { BreadcrumbModule } from 'primeng/breadcrumb';

@Component({
    imports: [
        BreadcrumbModule,
    ],
    selector: 'breadcrumb',
    template: `
    <p-breadcrumb [home]="home" [model]="items"></p-breadcrumb>
  `
})
export class BreadcrumbComponent implements OnInit {
  items: MenuItem[];
  readonly home = { icon: 'pi pi-home', iconStyle: { 'padding-right': '0.5em' }, routerLink: '/home', label: 'San Diego' };
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private candidateInfoGQL: CandidateCardInfoGQL,
    private titleMetaTagService: TitleMetaTagService,
  ) { }

   async createBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: MenuItem[] = []): Promise<MenuItem[]> {
    if (route.children.length < 1) {
      return breadcrumbs;
    }

    for (const child of route.children) {
      const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');

      if (routeURL !== '') {
        url += `/${routeURL}`;
      }

      let label: string;
      const type: string = child.snapshot.data['type'];

      if (type === 'district') {
        label = child.snapshot.data.office.office;

        if (child.snapshot.params['district_number'] !== '0') {
          label += ` District ` + child.snapshot.params['district_number'];
        }
      } else if (type === 'candidate') {
        const candidateId = child.snapshot.params['candidateId'];
        const fullName$ = this.candidateInfoGQL
          .fetch({ candidateId: candidateId })
          .pipe(map((result) => result?.data?.candidate?.fullName));

        label = await (fullName$).toPromise();
      } else if (type === 'details') {
        label = 'Details';
      } else if (type === 'year') {
        label = child.snapshot.params['year'];
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
      .subscribe( async () => {
        this.items = await this.createBreadcrumbs(this.activatedRoute.root);
        this.titleMetaTagService.setTitle(this.items);
      })
  }
}
