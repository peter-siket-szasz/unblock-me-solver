"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeMove = exports.getId = void 0;
function getId(blocks) {
    return blocks.map((block) => `${block.x}${block.y}`).join('');
}
exports.getId = getId;
/**
 * @param blocks The array of blocks on the board
 * @param move The move to make
 * @returns The new array of blocks after the move
 */
function makeMove(blocks, move) {
    const { id } = move;
    const { x, y } = getNewCoords(blocks.find((block) => block.id === id), move);
    return blocks.map((block) => (block.id === id ? { ...block, x: x, y: y } : block));
}
exports.makeMove = makeMove;
/**
 * @param block The block to be moved
 * @param move The move to be made
 * @returns The new coordinates of the block after the move
 */
function getNewCoords(block, move) {
    const { amount, dir } = move;
    return {
        x: dir === 'x' ? block.x + amount : block.x,
        y: dir === 'y' ? block.y + amount : block.y,
    };
}
//# sourceMappingURL=utils.js.map