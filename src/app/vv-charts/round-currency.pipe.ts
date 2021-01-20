import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "roundCurrency",
})
export class RoundCurrencyPipe implements PipeTransform {
  transform(input: any, args?: any, threshold?: any): any {
    var exp,
      oneMillion = 1000000,
      minimum = Number.isNaN(threshold) ? oneMillion : Number(threshold),
      suffixes = ["k", "M", "G", "T", "P", "E"];

    if (Number.isNaN(input)) {
      return null;
    }
 
    // if (input < oneMillion) {
    if (input < minimum || input < 1000) {
      return Number(input).toLocaleString('en-US');
    }

    exp = Math.floor(Math.log(input) / Math.log(1000));

    return (input / Math.pow(1000, exp)).toFixed(args) + suffixes[exp - 1];
  }
}
