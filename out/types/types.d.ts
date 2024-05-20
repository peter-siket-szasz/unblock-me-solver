export type Block = {
    id: number;
    x: number;
    y: number;
    width: number;
    height: number;
};
export type Move = {
    id: number;
    amount: number;
    dir: 'x' | 'y';
};
export type State = {
    id: string;
    blocks: Block[];
    previousMoves: Move[];
};
