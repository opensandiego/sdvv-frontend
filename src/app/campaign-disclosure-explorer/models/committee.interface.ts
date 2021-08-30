export interface Committee {
  entity_id: string;
  entity_name: string;
  entity_name_lower: string;
  entity_type: string;
}

export interface CommitteeDB extends Committee {
  // id: string;
  createdAt: string;
  updatedAt: string;
}

export interface EFileCommitteeResponse {
  data: Committee[];
}
