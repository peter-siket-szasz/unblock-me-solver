export type Block = {
  id: number;
  x: number;
  y: number;
  width: 1 | 2 | 3;
  height: 1 | 2 | 3;
};

export type Move = {
  id: number;
  amount: number;
};

const player = { x: 0, y: 2, width: 2, height: 1, id: 1 } satisfies Block;

const blocks: Block[] = [player];

const stringifyBlocks = (blocks: Block[]): string =>
  blocks
    .toSorted((a, b) => a.id - b.id)
    .map(({ id, x, y }) => JSON.stringify({ id, x, y }))
    .join('');

export function getHorizontalMoves(block: Block, blocks: Block[], maxWidth = 6): Move[] {
  const { id, y, width, height } = block;
  let { x } = block;
  const moves: Move[] = [];

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
      ? moves.push({ id, amount: x - block.x })
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
      ? moves.push({ id, amount: x - block.x })
      : (x = maxWidth);
  }

  return moves;
}

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
        const move: Move = { id, amount: -1 };
        moves.push(move);
        queue.push({ ...block, x: x - 1 });
      }
      if (canMoveRight) {
        const move: Move = { id, amount: 1 };
        moves.push(move);
        queue.push({ ...block, x: x + 1 });
      }
      if (canMoveUp) {
        const move: Move = { id, amount: -1 };
        moves.push(move);
        queue.push({ ...block, y: y - 1 });
      }
      if (canMoveDown) {
        const move: Move = { id, amount: 1 };
        moves.push(move);
        queue.push({ ...block, y: y + 1 });
      }
    }
  }
  return { moves };
}

console.log(stringifyBlocks(blocks));
