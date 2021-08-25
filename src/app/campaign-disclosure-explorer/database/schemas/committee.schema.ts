export const committeeSchema = {
  "title": "committee schema",
  "description": "committee schema",
  "version": 0,
  "primaryKey": {
    "key": "id",
    "fields": [
      "entity_id",
      "entity_name_lower"
    ],
    "separator": "|"
  },
  "type": "object",
  "required": [ "id", "entity_id",  "entity_name_lower" ],
  "properties": {
    "entity_id": {
      "type": "string",
    },
    "entity_name": {
      "type": "string",
    },
    "entity_name_lower": {
      "type": "string",
    },
    "entity_type": {
      "type": "string",
    },
    // Fields below are not from eFile
    "id": {
      "type": "string"
    },
    "filing_count": {
      "type": "number",
      "default": 0,
    },
    "transaction_count": {
      "type": "number",
      "default": 0,
    },
    "createdAt": {
      "type": "string",
    },
    "updatedAt": {
      "type": "string",
    },
  }
}
