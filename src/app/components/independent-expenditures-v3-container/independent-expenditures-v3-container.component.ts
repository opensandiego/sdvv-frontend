import { Component, inject, input } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { ChartTitleComponent } from 'lib-ui-components';
import { IndependentExpendituresV2Component } from '../../pages/candidates/summary/independent-expenditures-v2/independent-expenditures-v2.component';
import { globals } from 'src/app/globals';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { map, switchMap } from 'rxjs';
import { CandidatesIndependentExpendituresService } from 'src/app/services/candidates-independent-expenditures/candidates-independent-expenditures.service';

@Component({
  selector: 'independent-expenditures-v3-container',
  imports: [
    MatDividerModule,
    ChartTitleComponent,
    IndependentExpendituresV2Component,
  ],
  template: `
    <mat-divider></mat-divider>

    <div class="outside-money-container">
      <chart-title
        [titleText]="title"
        [tooltipText]="tooltipText"
      ></chart-title>

      @if (candidateIEFilers()) {
        <independent-expenditures-v2
          [oppositionCommittees]="candidateIEFilers().oppositionCommittees"
          [supportCommittees]="candidateIEFilers().supportCommittees"
        ></independent-expenditures-v2>
      }
    </div>
  `,
  styles: [
    `
      .mat-divider {
        border-top-width: 3px;
        border-top-style: solid;
      }
    `,
  ],
})
export class IndependentExpendituresV3ContainerComponent {
  private candidatesIndependentExpendituresService = inject(
    CandidatesIndependentExpendituresService,
  );

  opposeShades = [
    globals.expendituresInOppositionColor,
    globals.expendituresInOppositionAltColor,
  ];

  supportShades = [
    globals.expendituresInSupportColor,
    globals.expendituresInSupportAltColor,
  ];

  title = 'Outside Money / Independent Expenditures';
  tooltipText =
    'Amount of money spent by other committees to support or oppose a candidate.';
  textColor = 'white';
  backgroundColor = '#dcdcdc';

  candidateId = input.required<string>();

  candidateIEFilers = toSignal(
    toObservable(this.candidateId).pipe(
      switchMap((id) =>
        this.candidatesIndependentExpendituresService.getIndependentExpendituresCandidate(
          { candidateId: id },
        ),
      ),
      map((data) => {
        const supportSum = data.candidateSeries.supportTotal;
        const opposeSum = data.candidateSeries.opposeTotal;

        const supportCommittees = data.candidateSeries.support?.map(
          (filer, index) => ({
            id: `${filer.filerName}${index}`, // update this to make a better id
            name: filer.filerName,
            value: filer.amount,
            percent: (filer.amount / supportSum) * 100.0,
            color: `${this.supportShades[index % 2]}`,
          }),
        );

        const oppositionCommittees = data.candidateSeries.oppose?.map(
          (filer, index) => ({
            id: `${filer.filerName}${index}`,
            name: filer.filerName,
            value: filer.amount,
            percent: (filer.amount / opposeSum) * 100.0,
            color: `${this.opposeShades[index % 2]}`,
          }),
        );

        return { supportCommittees, oppositionCommittees };
      }),
    ),
  );
}
