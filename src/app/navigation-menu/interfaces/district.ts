import { Candidate } from "src/app/store/interfaces/candidate";

export interface District {
  district_number: string;
  office: string;
  candidates: Candidate[]
}
