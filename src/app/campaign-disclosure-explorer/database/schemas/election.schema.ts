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
  },
  "required": ["election_id"],
}
