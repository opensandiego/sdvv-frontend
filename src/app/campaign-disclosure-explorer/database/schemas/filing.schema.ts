
export const filingSchema = {
  "title": "filing schema",
  "description": "filing schema",
  "version": 0,
  "type": "object",
  "properties": {
    "coe_id": {
      "type": "string"
    },
    "entity_id": {
      "type": "string"
    },
    "name": {
      "type": "string"
    },
    "name_first": {
      "type": ["string", "null"]
    },
    "name_title": {
      "type": ["string", "null"]
    },
    "name_suffix": {
      "type": ["string", "null"]
    },
    "filing_id": {
      "type": "string",
      "primary": true
    },
    "doc_public": {
      "type": "string"
    },
    "period_start": {
      "type": "string"
    },
    "period_end": {
      "type": "string"
    },
    "filing_type": {
      "type": "string"
    },
    "e_filing_id": {
      "type": "string"
    },
    "filing_date": {
      "type": "string"
    },
    "amendment": {
      "type": "boolean"
    },

    "amends_orig_id": {
      "type": "object"
    },
    "amends_prev_id": {
      "type": "object"
    },

    "amendment_number": {
      "type": "integer"
    },
    "form_name": {
      "type": ["string", "null"]
    },
    "filing_subtypes": {
      "type": ["string", "null"]
    },
    "entity_name": {
      "type": "string"
    } 
  },
  "required": [],
}
