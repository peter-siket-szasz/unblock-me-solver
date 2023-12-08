export type Block = {
  id: number;
  x: number;
  y: number;
  width: 1 | 2 | 3;
  height: 1 | 2 | 3;
};

export type Move = {
  id: number;
  amount: number;
  dir: 'x' | 'y';
};
