export interface Candidate {
    name: string;
    title: string;
    raised: string;
    donors: string;
}

export interface CandidateTree {
    title: string;
    candidates: Record<string, string>;
}
