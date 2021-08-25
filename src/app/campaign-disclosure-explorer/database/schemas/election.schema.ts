import {
  RxCollection,
  RxJsonSchema,
  RxDocument,
} from 'rxdb';

export const electionSchema = {
  "title": "election schema",
  "description": "election schema",
  "version": 0,
  "type": "object",
  "required": ["election_id"],
  "properties": {
    "election_date": {
      "type": "string",
    },
    "election_id": {
      "type": "string",
      "primary": true,
    },
    "election_type": {
      "type": "string",
    },
    "internal": {
      "type": "boolean",
    },
    // Fields below are not from eFile
    "candidates_count": {
      "type": "number",
      "default": 0,
    },
    "createdAt": {
      "type": "string",
    },
    "updatedAt": {
      "type": "string",
    },
  },
}
