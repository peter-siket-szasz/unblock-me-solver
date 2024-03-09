import { Block, Move } from './types/types';
/**
 * Solves a given problem with
 * @param initialBlocks The initial blocks on the board. Player should have index 1
 * @param maxHeight Board height
 * @param maxWidth Board width
 * @param bidirectional Whether the blocks can move in both directions
 * @param goalY The row where the goal is
 * @returns A list of moves with the solution to the problem
 */
export declare function solve(initialBlocks: Block[], maxHeight?: number, maxWidth?: number, bidirectional?: boolean, goalY?: number): Move[];
