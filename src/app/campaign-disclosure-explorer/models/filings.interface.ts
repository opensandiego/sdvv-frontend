export interface Filing {
  filing_id: string;
  doc_public: string;
  period_end: string;
  filing_type: string;
  e_filing_id: string;
  filing_date: string;
  amendment: boolean;
  amends_orig_id: string;
  amends_prev_id: string;
  amendment_number: number;
  filing_subtypes: string;
  entity_name: string;
}

export interface FilingDB extends Filing {
  filing_date_time: string;
  enabled: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface EFileFilingResponse {
  data: Filing;
}
