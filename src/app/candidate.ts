export interface Candidate {
    name: string;
    title: string;
    raised: string;
    donors: string;
}

export interface CandidateTree {
    title: string;
    name: string;
    candidates: Record<string, string>;
}
