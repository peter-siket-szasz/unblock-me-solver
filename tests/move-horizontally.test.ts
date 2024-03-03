import { getHorizontalMoves } from '../utils/getMoves';
import { Block } from '../types/types';

describe('getHorizontalMoves', () => {
  it('should return all possible moves for a block', () => {
    const blocks: Block[] = [
      { id: 1, x: 0, y: 1, width: 1, height: 1 },
      { id: 2, x: 2, y: 1, width: 1, height: 1 },
      { id: 3, x: 4, y: 1, width: 1, height: 1 },
    ];
    const block = blocks[1];

    const result = getHorizontalMoves(block, blocks, 6, true);

    expect(result).toEqual([
      { id: 2, amount: -1, dir: 'x' }, // move left by 1
      { id: 2, amount: 1, dir: 'x' }, // move right by 1
    ]);
  });

  it('should not move beyond the edges', () => {
    const block = { x: 1, y: 0, width: 1, height: 1, id: 1 } satisfies Block;
    const blocks = [block];
    const moves = getHorizontalMoves(block, blocks, 6, true);
    expect(moves).toEqual([
      { id: 1, amount: -1, dir: 'x' },
      { id: 1, amount: 1, dir: 'x' },
      { id: 1, amount: 2, dir: 'x' },
      { id: 1, amount: 3, dir: 'x' },
      { id: 1, amount: 4, dir: 'x' },
    ]);
  });

  it('should handle wider blocks', () => {
    const block = { x: 0, y: 0, width: 3, height: 1, id: 1 } satisfies Block;
    const blocks = [block];
    const moves = getHorizontalMoves(block, blocks, 6, true);
    expect(moves).toEqual([
      { id: 1, amount: 1, dir: 'x' },
      { id: 1, amount: 2, dir: 'x' },
      { id: 1, amount: 3, dir: 'x' },
    ]);
  });

  it('should handle taller blocks as obstacles', () => {
    const blocks: Block[] = [
      { x: 0, y: 2, width: 2, height: 1, id: 1 },
      { x: 2, y: 0, width: 1, height: 2, id: 2 },
      { x: 3, y: 0, width: 1, height: 3, id: 2 },
    ];
    const block = blocks[0];
    const moves = getHorizontalMoves(block, blocks, 6, true);
    expect(moves).toEqual([{ id: 1, amount: 1, dir: 'x' }]);
  });
  it('should handle taller blocks as moving', () => {
    const blocks: Block[] = [
      { x: 0, y: 2, width: 1, height: 2, id: 1 },
      { x: 2, y: 0, width: 1, height: 2, id: 2 },
      { x: 3, y: 0, width: 1, height: 3, id: 2 },
    ];
    const block = blocks[0];
    const moves = getHorizontalMoves(block, blocks, 6, true);
    expect(moves).toEqual([
      { id: 1, amount: 1, dir: 'x' },
      { id: 1, amount: 2, dir: 'x' },
    ]);
  });
  it('should handle complex setup of blocks and possible moves', () => {
    const blocks: Block[] = [
      { x: 2, y: 2, width: 2, height: 1, id: 1 },
      { x: 0, y: 0, width: 1, height: 3, id: 2 },
      { x: 1, y: 0, width: 1, height: 2, id: 3 },
      { x: 4, y: 0, width: 1, height: 3, id: 4 },
      { x: 5, y: 0, width: 1, height: 1, id: 5 },
      { x: 1, y: 4, width: 3, height: 1, id: 6 },
    ];
    const moves = getHorizontalMoves(blocks[0], blocks, 6, true);
    expect(moves).toEqual([{ id: 1, amount: -1, dir: 'x' }]);
  });
  it('should return no moves for a wide block when bidirectional movement is restricted', () => {
    const blocks: Block[] = [{ id: 2, x: 2, y: 5, width: 1, height: 3 }];

    const block = blocks[0];
    const result = getHorizontalMoves(block, blocks, 12);

    expect(result).toEqual([]);
  });
});
