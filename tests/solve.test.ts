import { solve } from '../index';
import { Block } from '../types/types';

describe('solve function', () => {
  it('should return correct result for an empty board with just the player', () => {
    const blocks: Block[] = [{ id: 1, x: 1, y: 2, width: 2, height: 1 }];

    const result = solve(blocks);

    const expectedResult = [{ id: 1, amount: 3, dir: 'x' }];

    expect(result).toEqual(expectedResult);
  });
  it('should return correct result for a board with the player and one block', () => {
    const blocks: Block[] = [
      { id: 1, x: 1, y: 2, width: 2, height: 1 },
      { id: 2, x: 3, y: 0, width: 1, height: 3 },
    ];

    const result = solve(blocks);

    const expectedResult = [
      { id: 2, amount: 3, dir: 'y' },
      { id: 1, amount: 3, dir: 'x' },
    ];

    expect(result).toEqual(expectedResult);
  });
  it('should throw an error if there is no player', () => {
    const blocks: Block[] = [
      { id: 3, x: 1, y: 2, width: 2, height: 1 },
      { id: 2, x: 3, y: 0, width: 1, height: 3 },
    ];

    expect(() => solve(blocks)).toThrow('Player block not found');
  });
  it('should throw an error if the player is in the wrong row', () => {
    const blocks: Block[] = [
      { id: 1, x: 1, y: 3, width: 2, height: 1 },
      { id: 2, x: 3, y: 0, width: 1, height: 3 },
    ];

    expect(() => solve(blocks)).toThrow('Player block not in the correct row');
  });
  it('should return correct result for a complicated board setup', () => {
    const blocks: Block[] = [
      { id: 1, x: 2, y: 2, width: 2, height: 1 },
      { id: 2, x: 1, y: 0, width: 2, height: 1 },
      { id: 3, x: 4, y: 0, width: 2, height: 1 },
      { id: 4, x: 0, y: 1, width: 3, height: 1 },
      { id: 5, x: 4, y: 1, width: 1, height: 3 },
      { id: 6, x: 5, y: 1, width: 1, height: 2 },
      { id: 7, x: 0, y: 2, width: 1, height: 3 },
      { id: 8, x: 1, y: 2, width: 1, height: 2 },
      { id: 9, x: 5, y: 3, width: 1, height: 2 },
      { id: 10, x: 2, y: 4, width: 1, height: 2 },
      { id: 11, x: 3, y: 4, width: 2, height: 1 },
      { id: 12, x: 0, y: 5, width: 2, height: 1 },
      { id: 13, x: 4, y: 5, width: 2, height: 1 },
    ];

    const result = solve(blocks);

    const expectedResult = [
      { id: 2, amount: -1, dir: 'x' },
      { id: 3, amount: -1, dir: 'x' },
      { id: 8, amount: 1, dir: 'y' },
      { id: 10, amount: -1, dir: 'y' },
      { id: 12, amount: 1, dir: 'x' },
      { id: 7, amount: 1, dir: 'y' },
      { id: 1, amount: -2, dir: 'x' },
      { id: 10, amount: -1, dir: 'y' },
      { id: 11, amount: -1, dir: 'x' },
      { id: 5, amount: 1, dir: 'y' },
      { id: 13, amount: -1, dir: 'x' },
      { id: 9, amount: 1, dir: 'y' },
      { id: 6, amount: 1, dir: 'y' },
      { id: 4, amount: 3, dir: 'x' },
      { id: 10, amount: -2, dir: 'y' },
      { id: 1, amount: 1, dir: 'x' },
      { id: 7, amount: -1, dir: 'y' },
      { id: 12, amount: -1, dir: 'x' },
      { id: 13, amount: -1, dir: 'x' },
      { id: 5, amount: 1, dir: 'y' },
      { id: 1, amount: 2, dir: 'x' },
      { id: 10, amount: 2, dir: 'y' },
      { id: 4, amount: -1, dir: 'x' },
      { id: 6, amount: -2, dir: 'y' },
      { id: 1, amount: 1, dir: 'x' },
    ];

    expect(result).toEqual(expectedResult);
  });
});
