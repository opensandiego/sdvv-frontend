import { EntityMetadataMap } from '@ngrx/data';
 
const entityMetadata: EntityMetadataMap = {
  Election: {},
  Office: {},
  Candidate: {},
  CandidateCard: {},
  CandidateQuickView: {},
  CandidateDetail: {},
  CandidateNavigation: {},
};
 
const pluralNames = { 
  Election: 'Elections',
  Office: 'Offices',
  Candidate: 'Candidates',
  CandidateCard: 'CandidateCards',
  CandidateQuickView: 'CandidateQuickViews',
  CandidateDetail: 'CandidateDetails',
  CandidateNavigation: 'CandidateNavigations',
};
 
export const entityConfig = {
  entityMetadata,
  pluralNames
};
