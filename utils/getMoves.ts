import { Block, Move } from '../types/types';

/**
 * @param block The block to move
 * @param blocks The blocks on the board (can include the block to move)
 * @param maxWidth Width of the board
 * @param bidirectional Whether to allow moving in both directions
 * @returns The possible moves for the block as an array of Move objects
 */
export function getHorizontalMoves(block: Block, blocks: Block[], maxWidth = 6, bidirectional = false): Move[] {
  const { id, y, width, height } = block;
  let { x } = block;
  const moves: Move[] = [];
  if (!bidirectional && width < height) return [];

  // Filter out the moving block itself
  const otherBlocks = blocks.filter((b) => b.id !== block.id);

  // Moves to the left
  while (x > 0) {
    x--;
    !otherBlocks.some(
      (otherBlock) =>
        otherBlock.x + otherBlock.width - 1 === x &&
        !(otherBlock.y >= y + height || otherBlock.y + otherBlock.height <= y),
    )
      ? moves.push({ id, amount: x - block.x, dir: 'x' })
      : (x = 0);
  }

  // Reset x for moves to the right
  x = block.x;

  // Moves to the right
  while (x + width < maxWidth) {
    x++;
    !otherBlocks.some(
      (otherBlock) =>
        otherBlock.x === x + width - 1 && !(otherBlock.y >= y + height || otherBlock.y + otherBlock.height <= y),
    )
      ? moves.push({ id, amount: x - block.x, dir: 'x' })
      : (x = maxWidth);
  }

  return moves;
}

/**
 * @param block The block to move
 * @param blocks The blocks on the board (can include the block to move)
 * @param maxHeight Height of the board
 * @param bidirectional Whether to allow moving in both directions
 * @returns The possible moves for the block as an array of Move objects
 */
export function getVerticalMoves(block: Block, blocks: Block[], maxHeight = 6, bidirectional = false): Move[] {
  const { id, x, width, height } = block;
  let { y } = block;
  const moves: Move[] = [];

  if (!bidirectional && height < width) return [];

  // Filter out the moving block itself
  const otherBlocks = blocks.filter((b) => b.id !== block.id);

  // Moves upwards
  while (y > 0) {
    y--;
    !otherBlocks.some(
      (otherBlock) =>
        otherBlock.y + otherBlock.height - 1 === y &&
        !(otherBlock.x >= x + width || otherBlock.x + otherBlock.width <= x),
    )
      ? moves.push({ id, amount: y - block.y, dir: 'y' })
      : (y = 0);
  }

  // Reset y for moves downwards
  y = block.y;

  // Moves downwards
  while (y + height < maxHeight) {
    y++;
    !otherBlocks.some(
      (otherBlock) =>
        otherBlock.y === y + height - 1 && !(otherBlock.x >= x + width || otherBlock.x + otherBlock.width <= x),
    )
      ? moves.push({ id, amount: y - block.y, dir: 'y' })
      : (y = maxHeight);
  }

  return moves;
}

/**
 * @param block The block to move
 * @param blocks The blocks on the board (can include the block to move)
 * @param maxWidth Size of the board
 * @param maxHeight Size of the board
 * @param bidirectional Whether to allow moving in both directions
 * @returns The possible moves for the block as an array of Move objects
 */
export function getMoves(block: Block, blocks: Block[], maxWidth = 6, maxHeight = 6, bidirectional = false): Move[] {
  const horizontalMoves = getHorizontalMoves(block, blocks, maxWidth, bidirectional);
  const verticalMoves = getVerticalMoves(block, blocks, maxHeight, bidirectional);
  return [...horizontalMoves, ...verticalMoves];
}
