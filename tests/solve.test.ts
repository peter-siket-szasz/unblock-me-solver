import { solve } from '../index';
import { Block } from '../types/types';

describe('solve function', () => {
  it('should return correct result for an empty board with just the player', () => {
    const blocks: Block[] = [{ id: 1, x: 1, y: 2, width: 2, height: 1 }];

    const result = solve(blocks);

    // Replace the following line with your expected result
    const expectedResult = [{ id: 1, amount: 3, dir: 'x' }];

    expect(result).toEqual(expectedResult);
  });
  it('should return correct result for an empty board with just the player', () => {
    const blocks: Block[] = [
      { id: 1, x: 1, y: 2, width: 2, height: 1 },
      { id: 2, x: 3, y: 0, width: 1, height: 3 },
    ];

    const result = solve(blocks);

    // Replace the following line with your expected result
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
});
