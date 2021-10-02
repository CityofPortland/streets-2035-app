export type Street = {
  id: string;
  name: string;
  block?: number;
  width: number;
  classifications: Classifications;
};

export type Classifications = {
  design: string;
  transit: string;
  bicycle: string;
};
