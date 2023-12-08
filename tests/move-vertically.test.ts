import { Block } from '../types/types';
import { getVerticalMoves } from '../utils/getMoves';

describe('getVerticalMoves', () => {
  it('should return all possible moves for a block', () => {
    const blocks: Block[] = [
      { id: 1, x: 1, y: 1, width: 1, height: 1 },
      { id: 2, x: 2, y: 2, width: 1, height: 1 },
      { id: 3, x: 3, y: 3, width: 1, height: 1 },
    ];

    const block = blocks[1];
    const result = getVerticalMoves(block, blocks, 6);

    expect(result).toEqual([
      { id: 2, amount: -1, dir: 'y' }, // move up by 1
      { id: 2, amount: -2, dir: 'y' }, // move up by 2
      { id: 2, amount: 1, dir: 'y' }, // move down by 1
      { id: 2, amount: 2, dir: 'y' }, // move down by 2
      { id: 2, amount: 3, dir: 'y' }, // move down by 3
    ]);
  });

  it('should not return moves that would cause a collision', () => {
    const blocks: Block[] = [
      { id: 1, x: 2, y: 0, width: 1, height: 1 },
      { id: 2, x: 2, y: 2, width: 1, height: 1 },
      { id: 3, x: 2, y: 4, width: 1, height: 1 },
    ];

    const block = blocks[1];
    const result = getVerticalMoves(block, blocks, 6);

    expect(result).toEqual([
      { id: 2, amount: -1, dir: 'y' }, // move up by 1
      { id: 2, amount: 1, dir: 'y' }, // move down by 1
    ]);
  });
  it('should return all possible moves for a wider block', () => {
    const blocks: Block[] = [
      { id: 1, x: 1, y: 1, width: 3, height: 1 },
      { id: 2, x: 2, y: 3, width: 3, height: 1 },
      { id: 3, x: 3, y: 5, width: 3, height: 1 },
    ];

    const block = blocks[1];
    const result = getVerticalMoves(block, blocks, 6);

    expect(result).toEqual([
      { id: 2, amount: -1, dir: 'y' }, // move up by 1
      { id: 2, amount: 1, dir: 'y' }, // move down by 1
    ]);
  });

  it('should return all possible moves for a taller block', () => {
    const blocks: Block[] = [
      { id: 1, x: 1, y: 1, width: 1, height: 3 },
      { id: 2, x: 1, y: 5, width: 1, height: 3 },
      { id: 3, x: 1, y: 9, width: 1, height: 3 },
    ];

    const block = blocks[1];
    const result = getVerticalMoves(block, blocks, 12);

    expect(result).toEqual([
      { id: 2, amount: -1, dir: 'y' }, // move up by 1
      { id: 2, amount: 1, dir: 'y' }, // move down by 1
    ]);
  });

  it('should return all possible moves for a block that is both wider and taller', () => {
    const blocks: Block[] = [
      { id: 1, x: 1, y: 1, width: 3, height: 3 },
      { id: 2, x: 2, y: 5, width: 3, height: 3 },
      { id: 3, x: 3, y: 9, width: 3, height: 3 },
    ];

    const block = blocks[1];
    const result = getVerticalMoves(block, blocks, 12);

    expect(result).toEqual([
      { id: 2, amount: -1, dir: 'y' }, // move up by 1
      { id: 2, amount: 1, dir: 'y' }, // move down by 1
    ]);
  });
});
