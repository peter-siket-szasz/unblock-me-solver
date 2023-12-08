import { Block, Move } from './types/types';
import { stringifyBlocks } from './utils/utils';

const player = { x: 0, y: 2, width: 2, height: 1, id: 1 } satisfies Block;

const blocks: Block[] = [player];

function solve(blocks: Block[]): { moves: Move[] } {
  const moves: Move[] = [];
  const seen = new Set<string>();
  const queue: Block[] = blocks;
  while (queue.length) {
    const block = queue.shift();
    if (block) {
      const { id, x, y, width, height } = block;
      const key = stringifyBlocks(blocks);
      if (seen.has(key)) {
        continue;
      }
      seen.add(key);
      if (x === 4 && y === 2) {
        return { moves };
      }
      const canMoveLeft = x > 0;
      const canMoveRight = x + width < 6;
      const canMoveUp = y > 0;
      const canMoveDown = y + height < 6;
      if (canMoveLeft) {
        ('');
      }
      if (canMoveRight) {
        ('');
      }
      if (canMoveUp) {
        ('');
      }
      if (canMoveDown) {
        ('');
      }
    }
  }
  return { moves };
}

console.log(stringifyBlocks(blocks));
