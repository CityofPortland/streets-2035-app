import { LineString } from '@turf/helpers';

export type Street = {
  id: string;
  name: string;
  block?: number | null;
  width: number | null;
  classifications: Classifications;
  geometry: LineString;
};

export type Classifications = {
  design: string | null;
  transit: string | null;
  bicycle: string | null;
};

export type StreetSection = {
  name: string;
  minWidth?: number;
  maxWidth?: number;
  classifications: Classifications;
  segments: Array<Partial<Street>>;
};
