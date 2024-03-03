import { Block, Move } from './types/types';
import { getMoves } from './utils/getMoves';
import { makeMove, stringifyBlocks } from './utils/utils';

const player = { x: 0, y: 2, width: 2, height: 1, id: 1 } satisfies Block;

const initialBlocks: Block[] = [player];

function solve(initialBlocks: Block[]): Move[] {
  const seen = new Set<string>();
  const queue: { board: string; previousMoves: Move[] }[] = [
    { board: JSON.stringify(initialBlocks), previousMoves: [] },
  ];
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
    if (player.x === 4 && player.y === 2) {
      return previousMoves;
    }
    // Check if seen
    const key = stringifyBlocks(blocks);
    if (seen.has(node.board)) {
      continue;
    }
    seen.add(key);
    // Get possible moves
    const newMoves = blocks.map((block) => getMoves(block, blocks)).flat();
    // Add new nodes to queue
    for (const move of newMoves) {
      const newBoard = JSON.stringify(makeMove(blocks, move));
      queue.push({ board: newBoard, previousMoves: [...previousMoves, move] });
    }
  }
  return [];
}

console.log(stringifyBlocks(initialBlocks));
console.log(solve(initialBlocks));
