
export const transactionSchema = {
  "title": "transaction schema",
  "description": "transaction schema",
  "version": 0,
  "primaryKey": {
    "key": "id",
    "fields": [
      "filing_id",
      "tran_id"
    ],
    "separator": "|"
  },
  "type": "object",
  // "required": [ "id", "filing_id", "tran_id" ],
  "properties": {
    "filer_name": {
      "type": "string"
    },
    "doc_public": {
      "type": "string"
    },
    "e_filing_id": {
      "type": "string",
      // "format": "integer"
    },
    "tran_id": {
      "type": "string"
    },
    "transaction_date": {
      "type": "string"
    },
    "amount": {
      "type": "string"
    },
    "tx_type": {
      "type": "string"
    },
    "schedule": {
      "type": "string"
    },
    "filing_id": {
      "type": "string",
      // "format": "uuid"
    },
    "filing_type": {
      "type": "string"
    },
    "name": {
      "type": "string"
    },
    "intr_name": {
      "type": ["string", "null"]
    },
    "city": {
      "type": ["string", "null"]
    },
    "state": {
      "type": ["string", "null"]
    },
    "zip": {
      "type": ["string", "null"]
      // "format": "integer"
    },
    "spending_code": {
      "type": ["string", "null"]
    },
    "employer": {
      "type": ["string", "null"]
    },
    "occupation": {
      "type": ["string", "null"]
    },
    // Fields below are not from eFile
    "id": {
      "type": "string"
    },
    "transaction_date_time": {
      "type": "string",
      "format": "date-time"
    },
    "has_been_processed": {
      "type": "boolean",
      "default": false,
    },    
    "include_in_calculations": {
      "type": "boolean",
      "default": false,
    },
  },
}
