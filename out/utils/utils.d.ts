import { Block, Move } from '../types/types';
/**
 * @param blocks The array of blocks on the board
 * @returns A stringified representation of the blocks for comparison purposes
 */
export declare function stringifyBlocks(blocks: Block[]): string;
export declare function getId(blocks: Block[]): string;
/**
 * @param blocks The array of blocks on the board
 * @param move The move to make
 * @returns The new array of blocks after the move
 */
export declare function makeMove(blocks: Block[], move: Move): Block[];
