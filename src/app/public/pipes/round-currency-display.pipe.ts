import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "roundCurrencyDisplay",
})
export class RoundCurrencyDisplayPipe implements PipeTransform {
  transform(input: any, args?: any): any {
    var exp,
      oneMillion = 1000000,
      suffixes = ["k", "M", "G", "T", "P", "E"];

    if (Number.isNaN(input)) {
      return null;
    }
 
    if (parseInt(input) < oneMillion) {
      return Number(input).toLocaleString('en-US');
    }

    exp = Math.floor(Math.log(input) / Math.log(1000));

    return (input / Math.pow(1000, exp)).toFixed(args) + suffixes[exp - 1];
  }
}
