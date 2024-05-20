import { Block, Move } from '../types/types';

export function getId(blocks: Block[]): string {
  return blocks.map((block) => `${block.x}${block.y}`).join('');
}

/**
 * @param blocks The array of blocks on the board
 * @param move The move to make
 * @returns The new array of blocks after the move
 */
export function makeMove(blocks: Block[], move: Move): Block[] {
  const { id } = move;
  const { x, y } = getNewCoords(blocks.find((block) => block.id === id)!, move);
  return blocks.map((block) => (block.id === id ? { ...block, x: x, y: y } : block));
}

/**
 * @param block The block to be moved
 * @param move The move to be made
 * @returns The new coordinates of the block after the move
 */
function getNewCoords(block: Block, move: Move): { x: number; y: number } {
  const { amount, dir } = move;
  return {
    x: dir === 'x' ? block.x + amount : block.x,
    y: dir === 'y' ? block.y + amount : block.y,
  };
}
