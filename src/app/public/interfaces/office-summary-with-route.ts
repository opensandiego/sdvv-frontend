import { OfficeSummary } from "src/app/store/interfaces/office.summary";

export interface OfficeSummaryWithRoute extends OfficeSummary {
  routeLink: string;
}
