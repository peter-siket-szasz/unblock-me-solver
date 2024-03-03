import { getMoves } from '../utils/getMoves';
import { Block } from '../types/types';

describe('getMoves', () => {
  it('should return all possible horizontal and vertical moves for a block', () => {
    // ......
    // .1....
    // ..2...
    // ...3..
    // ......
    // ......
    const blocks: Block[] = [
      { id: 1, x: 1, y: 1, width: 1, height: 1 },
      { id: 2, x: 2, y: 2, width: 1, height: 1 },
      { id: 3, x: 3, y: 3, width: 1, height: 1 },
    ];

    const block = blocks[1];
    const result = getMoves(block, blocks, 6, 6);

    expect(result).toEqual([
      { id: 2, amount: -1, dir: 'x' }, // move left by 1
      { id: 2, amount: -2, dir: 'x' }, // move left by 2
      { id: 2, amount: 1, dir: 'x' }, // move right by 1
      { id: 2, amount: 2, dir: 'x' }, // move right by 2
      { id: 2, amount: 3, dir: 'x' }, // move right by 3
      { id: 2, amount: -1, dir: 'y' }, // move up by 1
      { id: 2, amount: -2, dir: 'y' }, // move up by 2
      { id: 2, amount: 1, dir: 'y' }, // move down by 1
      { id: 2, amount: 2, dir: 'y' }, // move down by 2
      { id: 2, amount: 3, dir: 'y' }, // move down by 3
    ]);
  });

  it('should not return moves that would cause a collision', () => {
    // ......
    // ..4...
    // .125..
    // ..3...
    // ......
    // ......
    const blocks: Block[] = [
      { id: 1, x: 1, y: 2, width: 1, height: 1 }, // block above
      { id: 2, x: 2, y: 2, width: 1, height: 1 }, // block in the middle
      { id: 3, x: 3, y: 2, width: 1, height: 1 }, // block below
      { id: 4, x: 2, y: 1, width: 1, height: 1 }, // block to the left
      { id: 5, x: 2, y: 3, width: 1, height: 1 }, // block to the right
    ];

    const block = blocks[1];
    const result = getMoves(block, blocks, 6, 6);

    expect(result).toEqual([]); // No moves should be possible
  });
});
