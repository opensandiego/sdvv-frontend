import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { faMoneyBillWave, faHandHoldingUsd, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { CandidateDetailsService } from 'src/app/store/services/candidate.details.service';

@Component({
  selector: 'app-details-total-spent',
  templateUrl: './details-total-spent.component.html',
  styleUrls: ['./details-total-spent.component.scss']
})
export class DetailsTotalSpentComponent implements OnInit {
  title = "Total Spent";
  tooltipText = 'Placeholder tooltip text.';
  colors = ['#800000', '#b30000', '#cc0000', '#ff0000', '#ff9999'];

  cashInHand: number;
  loansAndDebts: number;
  totalSpent: number;
  totalSpentFormatted: string;

  categoriesCombined: any[];
  hoveredCategory: string = null;

  faMoneyBillWave = faMoneyBillWave;
  faHandHoldingUsd = faHandHoldingUsd;
  faQuestionCircle = faQuestionCircle;

  constructor(
    private candidateDetailsService: CandidateDetailsService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const candidateId = params.get('id');

      this.candidateDetailsService.getRaisedSpent(candidateId)
        .subscribe( response => {
          this.cashInHand = parseInt(response.cashOnHand);
          this.loansAndDebts = parseInt(response.loansAndDebts);
          this.totalSpent = parseInt(response.summary.totalSpent);
          this.totalSpentFormatted = this.totalSpent
            .toLocaleString('en', { style: 'currency', currency: 'USD', maximumFractionDigits: 0});

          this.categoriesCombined = response.spentGroup.map((group, i) => ({
            id: i.toString(),
            name: group.spending_code ? group.spending_code : 'null',
            value: parseInt(group.sum),
            percent: parseFloat(group.average),
            color: i < this.colors.length ? this.colors[i] : 'red',
          }))

        })
    });
  }

  categoryHoveredOver(category){
    this.hoveredCategory = category;
  }

}
