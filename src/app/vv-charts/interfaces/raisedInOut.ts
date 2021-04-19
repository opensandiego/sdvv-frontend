export interface RaisedInOut {
  id: string;
  inside: number;
  outside: number;
  areaName: string; // Example: 'City of San Diego'
  jurisdiction: string; // Example: 'City' || 'District'
  jurisdictionSuffix?: string; // Examples: '1', '5'
}
