
export const transactionSchema = {
  "title": "transaction schema",
  "description": "transaction schema",
  "version": 0,
  "type": "object",
  "properties": {
    "filer_name": {
      "type": "string"
    },
    "doc_public": {
      "type": "string"
    },
    "e_filing_id": {
      "type": "string",
      "format": "integer"
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
      "format": "uuid"
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
      "type": "string"
    },
    "state": {
      "type": "string"
    },
    "zip": {
      "type": "string",
      "format": "integer"
    },
    "spending_code": {
      "type": "string"
    },
    "employer": {
      "type": ["string", "null"]
    },
    "occupation": {
      "type": ["string", "null"]
    }
  },
  "required": [
    "amount",
    "city",
    "doc_public",
    "e_filing_id",
    "employer",
    "filer_name",
    "filing_id",
    "filing_type",
    "intr_name",
    "name",
    "occupation",
    "schedule",
    "spending_code",
    "state",
    "tran_id",
    "transaction_date",
    "tx_type",
    "zip"
  ]
}
