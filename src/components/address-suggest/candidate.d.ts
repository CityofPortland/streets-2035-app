export type Candidate = {
  type?: 'address' | 'intersection' | 'property';
  name: string;
  city?: string;
  state: string;
  location?: {
    x: number;
    y: number;
    spatialReference: { wkid: number; latestWkid: number };
  };
};
