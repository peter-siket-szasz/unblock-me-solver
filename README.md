# Unblock me solver

This is a solver for the classic game [Unblock me](https://play.google.com/store/apps/details?id=com.kiragames.unblockmefree&hl=en&gl=US)

## Interface

The package exposes a `solve` function which takes in a board state and returns the optimal solution as an array of `Move` objects.

### Object structure: 

`Block: { id: number, x: number, y: number, width: number, height: number }`

`Move: { blockId: number, amount: number, dir: 'x' | 'y' }`

### Solver interface

**Function**: solve

| Param          | Type                       | Description                                  |
| -------------- | -------------------------- | -------------------------------------------- |
| initialBlocks  | `Block[]`                  | The configuration of the blocks on the board |
| maxHeight      | `number` default `6`       | The height of the board                      |
| maxWidth       | `number` default `6`       | The width of the board                       |
| maxWidth       | `boolean` default `false`  | A flag to determine whether blocks can only move in the direction of their larger size or in both directions                                         |
| goalY          | `number` default `2`       | The row where the goal is                    |
| **Returns**    | `Move[]`                   | A list the moves for the optimal solution    |

## Implementation

The solver is implemented using a Breadth-first-search (BFS) algorithm. For each board state, all legal moves are calculated and added to the search queue. The queue is expanded in a FIFO-manner, hence BFS. Duplicate states are detected by comparing the stringified representations of each board. The search stops when the goal state is reached. The list of moves needed for each state is stored alongside the state in the queue. This allows us to trace back the optimal solution once the goal state is reached.