import { Pipe, PipeTransform } from "@angular/core";

import { getFormattedCurrency } from "../number-formatter";

@Pipe({
  name: "roundCurrencyDisplay",
})
export class RoundCurrencyDisplayPipe implements PipeTransform {
  transform(input: number, digits: number): any {
    return getFormattedCurrency(input, digits);
  }
}
