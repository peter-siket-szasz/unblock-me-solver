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


## Usage

For instance, given the following board state:
```
..22.3
.....3
1145..
..45..
6677..
....88
```

The following code will return the optimal solution:
```javascript
import { solve } from 'unblock-me-solver';

const blocks = [
    { id: 1, x: 0, y: 2, width: 2, height: 1 },
    { id: 2, x: 2, y: 0, width: 2, height: 1 },
    { id: 3, x: 5, y: 0, width: 1, height: 2 },
    { id: 4, x: 2, y: 2, width: 1, height: 2 },
    { id: 5, x: 3, y: 2, width: 1, height: 2 },
    { id: 6, x: 0, y: 4, width: 2, height: 1 },
    { id: 7, x: 2, y: 4, width: 2, height: 1 },
    { id: 8, x: 4, y: 5, width: 2, height: 1 },
];

const solution = solve(blocks);
console.log(solution);
```

```javascript
Output:
[
  { id: 2, amount: -2, dir: 'x' },
  { id: 4, amount: -2, dir: 'y' },
  { id: 5, amount: -2, dir: 'y' },
  { id: 1, amount: 4, dir: 'x' }
]
```

## Notes

In the original game, the board is always 6 x 6. However, the solver can handle boards of any size. The default board size is 6 x 6, but this can be overridden by passing the `maxHeight` and `maxWidth` parameters to the `solve` function. Additionally, blocks can only move in the direction of their larger size by default. This can be overridden by passing the `bidirectional` parameter to the `solve` function. The goal row is 2 by default, but this can be overridden by passing the `goalY` parameter to the `solve` function.
