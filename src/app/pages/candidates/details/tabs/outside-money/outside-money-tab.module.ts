import { NgModule } from '@angular/core';
import { DetailsTabOutsideMoneyComponent } from './details-tab-outside-money/details-tab-outside-money.component';
import { DetailsContainerOutsideMoneyComponent } from './details-outside-money/details-container-outside-money.component';

@NgModule({
  declarations: [],
  imports: [
    DetailsTabOutsideMoneyComponent,
    DetailsContainerOutsideMoneyComponent,
  ],
  exports: [DetailsTabOutsideMoneyComponent],
})
export class CandidateDetailsTabOutsideMoneyModule {}
