import { EntityMetadataMap } from '@ngrx/data';
 
const entityMetadata: EntityMetadataMap = {
  Election: {},
  Office: {},
  OfficeSummary: {},
  Candidate: {},
  CandidateCard: {},
  CandidateQuickView: {},
  CandidateDetail: {},
  CandidateNavigation: {},
  LastUpdate: {},
  CandidateDetailsHeader: {},
};
 
const pluralNames = { 
  Election: 'Elections',
  Office: 'Offices',
  OfficeSummary: 'OfficeSummaries',
  Candidate: 'Candidates',
  CandidateCard: 'CandidateCards',
  CandidateQuickView: 'CandidateQuickViews',
  CandidateDetail: 'CandidateDetails',
  CandidateNavigation: 'CandidateNavigations',
  LastUpdate: 'LastUpdates',
  CandidateDetailsHeader: 'CandidateDetailsHeaders',
};
 
export const entityConfig = {
  entityMetadata,
  pluralNames
};
