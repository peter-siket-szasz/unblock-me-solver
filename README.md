# This is a solver for the classic game [Unblock me](https://play.google.com/store/apps/details?id=com.kiragames.unblockmefree&hl=en&gl=US)

The objective of the game is to get the red player block to the other end of the board
by moving the other blocks out of the way.

## Implementation

### Algorithm
The solver is implemented with a Breadth-First search. It searches the state space by 
generating each legal move from a given position and expanding them in the order they were
generated. This guarantees an optimal solution.

A heuristic approach with A* where the heuristic function is the player's distance to the goal + the
number of blocks blocking its path does not always guarantee an optimal solution.

### Technologies
The solver itself is implemented in TypeScript, while the graphics are implemented with the p5.js library.

[p5.js library](https://p5js.org/)
[Typescript](https://www.typescriptlang.org/)
