import { LineString } from '@turf/helpers';

export type Street = {
  id: string;
  name: string;
  block: number;
  width: number;
  classifications: Classifications;
  geometry: LineString;
};

export type Classifications = {
  design: string;
  transit: string;
  bicycle: string;
};

export type StreetSection = {
  hash: string;
  name: string;
  minWidth?: number;
  maxWidth?: number;
  classifications: Classifications;
  segments: Array<Partial<Street>>;
};
