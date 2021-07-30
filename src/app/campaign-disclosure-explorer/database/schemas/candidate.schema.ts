import {
  RxCollection,
  RxJsonSchema,
  RxDocument,
} from 'rxdb';

export const candidateSchema = {
  "title": "candidate schema",
  "description": "candidate schema",
  "version": 0,
  "type": "object",
  "properties": {
    "coe_id": {
      "type": "string"
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
      "type": "string"
    },
    "last_name": {
      "type": "string"
    },
    "title": {
      "type": "string"
    },
    "suffix": {
      "type": "string"
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
      "type": "string"
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
    }
  },
  "required": ["election_id", "office_id"],
}
