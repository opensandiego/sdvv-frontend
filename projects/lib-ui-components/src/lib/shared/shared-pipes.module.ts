import { NgModule } from '@angular/core';
import { RoundCurrencyDisplayPipe } from './pipes/round-currency-display.pipe';

@NgModule({
  declarations: [
    RoundCurrencyDisplayPipe,
  ],
  imports: [
  ],
  exports: [ RoundCurrencyDisplayPipe, ]
})
export class SharedPipesModule { }
