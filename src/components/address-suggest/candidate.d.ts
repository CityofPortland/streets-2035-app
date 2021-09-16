type CandidateType = 'address' | 'intersection';

export interface Candidate {
  type?: CandidateType;
  name: string;
  city?: string;
  state: string;
}
