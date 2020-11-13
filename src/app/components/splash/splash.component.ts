import { Component, OnInit } from "@angular/core";
import campaignRaceTotals from "../../../assets/candidates/2020/campaign_race_totals.json";
import { RoundCurrencyDisplayPipe } from "../../pipes/round-currency-display.pipe";

@Component({
  selector: "app-splash",
  templateUrl: "./splash.component.html",
  styleUrls: ["./splash.component.scss"],
})
export class SplashComponent implements OnInit {
  mayorTotal: string;
  cityCouncilTotal: string;
  cityAttorneyTotal: string;

  constructor() {}

  ngOnInit() {
    this.mayorTotal = campaignRaceTotals.mayor;
    this.cityCouncilTotal = campaignRaceTotals["city council"];
    this.cityAttorneyTotal = campaignRaceTotals["city attorney"];
  }
}
