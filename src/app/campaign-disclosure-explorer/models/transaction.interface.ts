export interface Transaction {
  filing_id: string;
  tran_id: string;
  filer_name: string;
  doc_public: string;
  e_filing_id: string;
  transaction_date: string;
  amount: string;
  tx_type: string;
  schedule: string;
  filing_type: string;
  name: string;
  intr_name: string;
  city: string;
  state: string;
  zip: string;
  spending_code: string;
  employer: string;
  occupation: string;
}

export interface TransactionDB extends Transaction {
  transaction_date_time: string;
  has_been_processed: boolean;
  include_in_calculations: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface EFileTransactionResponse {
  data: Transaction[];
  page_number: number;
  page_size: number;
  success: boolean;
  total_count: number;
  total_pages: number;
}
