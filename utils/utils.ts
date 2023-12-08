import { Block } from '../types/types';

export function stringifyBlocks(blocks: Block[]): string {
  return blocks
    .toSorted((a, b) => a.id - b.id)
    .map(({ id, x, y }) => JSON.stringify({ id, x, y }))
    .join('');
}
