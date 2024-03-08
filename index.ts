import { Block, Move } from './types/types';
import { getMoves } from './utils/getMoves';
import { makeMove, stringifyBlocks } from './utils/utils';

/**
 * Solves a given problem with
 * @param initialBlocks The initial blocks on the board. Player should have index 1
 * @param maxHeight Board height
 * @param maxWidth Board width
 * @param bidirectional Whether the blocks can move in both directions
 * @param goalY The row where the goal is
 * @returns A list of moves with the solution to the problem
 */
export function solve(initialBlocks: Block[], maxHeight = 6, maxWidth = 6, bidirectional = false, goalY = 2): Move[] {
  const seen = new Set<string>();
  const queue: { board: string; previousMoves: Move[] }[] = [
    { board: JSON.stringify(initialBlocks), previousMoves: [] },
  ];
  // Check that players exists
  const player = initialBlocks.find((block) => block.id === 1);
  if (player === undefined) {
    throw new Error('Player block not found');
  }
  if (!bidirectional && player.y !== goalY) {
    throw new Error('Player block not in the correct row');
  }
  while (queue.length) {
    // Pop first node from queue
    const node = queue.shift();
    // Initialize variables of current node
    const { board, previousMoves } = node;
    // Parse the board
    const blocks = JSON.parse(board) as Block[];
    // Find the player
    const player = blocks.find((block) => block.id === 1);
    // Check if solved
    if (player.x === maxWidth - player.width && player.y === goalY) {
      return previousMoves;
    }
    // Check if seen
    const key = stringifyBlocks(blocks);
    if (seen.has(node.board)) {
      continue;
    }
    seen.add(key);
    // Get possible moves
    const newMoves = blocks.map((block) => getMoves(block, blocks, maxWidth, maxHeight, bidirectional)).flat();
    // Add new nodes to queue
    for (const move of newMoves) {
      const newBoard = JSON.stringify(makeMove(blocks, move));
      queue.push({ board: newBoard, previousMoves: [...previousMoves, move] });
    }
  }
  return [];
}
