import { Component, Input, OnInit } from '@angular/core';
import { ContributionsByCodeGQL, ContributionsByCode } from './contributions-by-code-gql.query';

@Component({
  selector: 'gql-contributions-by-code',
  template: `
    <contributions-by-code-stacked-bar
      [monetaryContributionsByCode]="monetaryContributions"
      [nonMonetaryContributionsByCode]="nonMonetaryContributions"
    ></contributions-by-code-stacked-bar>
  `,
})
export class ContributionsByCodeGQLComponent implements OnInit {
  @Input() candidateId: string;

  monetaryContributions = {};
  nonMonetaryContributions = {};

  constructor(private contributionsByCodeGQL: ContributionsByCodeGQL) {}

  ngOnInit() {

    this.contributionsByCodeGQL.watch({
      candidateId: this.candidateId,
      includeMonetary: true,
      includeNonMonetary: true,
    }, {
      // errorPolicy: 'all',
    }).valueChanges.subscribe( (result: any) => {
      const contributionsByCode: ContributionsByCode = result.data;

      if (contributionsByCode.candidate) {
        const monetary = contributionsByCode.candidate.committee.contributions.categorizedBy.method.monetary;

        this.monetaryContributions = { ...monetary };
        delete this.monetaryContributions['__typename'];


        const nonMonetary = contributionsByCode.candidate.committee.
        contributions.categorizedBy.method.nonMonetary;

        this.nonMonetaryContributions = { ...nonMonetary };
        delete this.nonMonetaryContributions['__typename'];
      }
    });
  }
}
