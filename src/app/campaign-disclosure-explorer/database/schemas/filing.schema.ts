
export const filingSchema = {
  "title": "filing schema",
  "description": "filing schema",
  "version": 0,
  "type": "object",
  "properties": {
    "filing_id": {
      "type": "string",
      "primary": true
    },
    "doc_public": {
      "type": ["string", "null"]
    },

    // format of "period_end" date in <candidate id> request is "04/12/2021"
    // format of "period_end" date in "campaign-search" request is "2021-04-12"
    //  this may be an error 
    "period_end": {
      "type": ["string", "null"]
    },
    "filing_type": {
      "type": "string"
    },
    "e_filing_id": {
      "type": "string"
    },
    "filing_date": {
      "type": "string",
      // "format": "date"
    },
    "amendment": {
      "type": "boolean"
    },
    // if "amendment" is false then both 
    //    "amends_orig_id" will contain a string with its own "filing_id"
    //    "amends_prev_id" will be null
    // if "amendment" is true then both
    //    "amends_orig_id" will contain the object: { orig_id: string, human_id: string }
    //    "amends_prev_id" will contain the object: { prev_id: string, human_id: string }
    "amends_orig_id": {
      "type": ["string", "object", "null"]
    },
    "amends_prev_id": {
      "type": ["string", "object", "null"]
    },

    "amendment_number": {
      "type": "integer"
    },

    "filing_subtypes": {
      "type": ["string", "null"]
    },
    "entity_name": {
      "type": "string"
    },

  // Fields only in https://efile.sandiego.gov/api/v1/public/campaign-search/candidate/filing/list/<coe_id> request
  // Found from the Search By Election page
    "coe_id": {
      "type": "string"
    },
    // "entity_id" is unique to each committee "name"
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
    "form_name": {
      "type": ["string", "null"]
    },

  // Fields only in https://efile.sandiego.gov/api/v1/public/campaign-search request
  // Found from the Campaign Disclosures page and using 'Search for Committee or Candidate by Name' 
    "period_start": {
      "type": ["string", "null"]
    },
    "amendment_type": {
      "type": ["string", "integer"]
    },
    "covers_period": {
      "type": "string"
    },
    "form": {
      "type": ["string", "null"]
    },
    // Fields below are not from eFile
    "filing_date_time": {
      "type": "string",
      "format": "date-time"
    },
    "enabled": {
      "type": "boolean",
      "default": true,
    },
    "createdAt": {
      "type": "string",
    },
    "updatedAt": {
      "type": "string",
    },
  },
  "required": [],
}
