"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.solve = void 0;
const getMoves_1 = require("./utils/getMoves");
const utils_1 = require("./utils/utils");
/**
 * Solves a given problem with
 * @param initialBlocks The initial blocks on the board. Player should have index 1
 * @param maxHeight Board height
 * @param maxWidth Board width
 * @param bidirectional Whether the blocks can move in both directions
 * @param goalY The row where the goal is
 * @returns A list of moves with the solution to the problem
 */
function solve(initialBlocks, maxHeight = 6, maxWidth = 6, bidirectional = false, goalY = 2) {
    const seen = new Set();
    const queue = [
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
        const blocks = JSON.parse(board);
        // Find the player
        const player = blocks.find((block) => block.id === 1);
        // Check if solved
        if (player.x === maxWidth - player.width && player.y === goalY) {
            return previousMoves;
        }
        // Check if seen
        const key = (0, utils_1.stringifyBlocks)(blocks);
        if (seen.has(node.board)) {
            continue;
        }
        seen.add(key);
        // Get possible moves
        const newMoves = blocks.map((block) => (0, getMoves_1.getMoves)(block, blocks, maxWidth, maxHeight, bidirectional)).flat();
        // Add new nodes to queue
        for (const move of newMoves) {
            const newBoard = JSON.stringify((0, utils_1.makeMove)(blocks, move));
            queue.push({ board: newBoard, previousMoves: [...previousMoves, move] });
        }
    }
    return [];
}
exports.solve = solve;
//# sourceMappingURL=index.js.map