
export const candidateSchema = {
  "title": "candidate schema",
  "description": "candidate schema",
  "version": 0,
  "type": "object",
  "required": ["election_id", "office_id"],
  "properties": {
    "coe_id": {
      "type": "string",
      "primary": true,
    },
    "filer_id": {
      "type": "string"
    },
    "office_id": {
      "type": "string"
    },
    "election_id": {
      "type": "string"
    },
    "first_name": {
      "type": "string"
    },
    "middle_name": {
      "type": ["string", "null"]
    },
    "last_name": {
      "type": "string"
    },
    "title": {
      "type": ["string", "null"]
    },
    "suffix": {
      "type": ["string", "null"]
    },
    "office": {
      "type": "string"
    },
    "office_code": {
      "type": "string"
    },
    "jurisdiction_id": {
      "type": "string"
    },
    "district": {
      "type": ["string", "null"]
    },
    "agency": {
      "type": "string"
    },
    "jurisdiction_type": {
      "type": "string"
    },
    "jurisdiction_name": {
      "type": "string"
    },
    "jurisdiction_code": {
      "type": "string"
    },
    "candidate_name": {
      "type": "string"
    },
    // Fields below are not from eFile
    "filings_count": {
      "type": "number",
      "default": 0,
    },
    "committees_count": {
      "type": "number",
      "default": 0,
    },
  },
}
