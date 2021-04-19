export interface CandidateJSON {
  "by industry": [
    { "industry 1": string[] },
    { "industry 2": string[] },
    { "industry 3": string[] },
    { "industry 4": string[] },
    { "industry 5": string[] },
  ],
  "candidate name": string,
  "committee name": string,
  "description": string,
  "first": string,
  "in general": boolean,
  "in vs out district": [{
    "in": string,
    "out": string,
  }],
  "last": string,
  "oppose": string,
  "raised vs spent": [{
    "Raised": string,
    "Spent": string,
    "Donors": string,
    "Average Donor": string
  }],
  "support": string,
  "website": string,
}
