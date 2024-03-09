import { Block, Move } from '../types/types';
/**
 * @param block The block to move
 * @param blocks The blocks on the board (can include the block to move)
 * @param maxWidth Width of the board
 * @param bidirectional Whether to allow moving in both directions
 * @returns The possible moves for the block as an array of Move objects
 */
export declare function getHorizontalMoves(block: Block, blocks: Block[], maxWidth?: number, bidirectional?: boolean): Move[];
/**
 * @param block The block to move
 * @param blocks The blocks on the board (can include the block to move)
 * @param maxHeight Height of the board
 * @param bidirectional Whether to allow moving in both directions
 * @returns The possible moves for the block as an array of Move objects
 */
export declare function getVerticalMoves(block: Block, blocks: Block[], maxHeight?: number, bidirectional?: boolean): Move[];
/**
 * @param block The block to move
 * @param blocks The blocks on the board (can include the block to move)
 * @param maxWidth Size of the board
 * @param maxHeight Size of the board
 * @param bidirectional Whether to allow moving in both directions
 * @returns The possible moves for the block as an array of Move objects
 */
export declare function getMoves(block: Block, blocks: Block[], maxWidth?: number, maxHeight?: number, bidirectional?: boolean): Move[];
