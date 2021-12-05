import P5 from "p5";
import { Block, Move } from "./types";

export default class State {
    cost: number;
    cols: number;
    rows: number;
    player: Block;

    constructor(private blocks: Block[], private grid: boolean[][], public gval: number, public move: Move, public parent: State, private goal: P5.Vector) {
        this.rows = grid.length;
        this.cols = grid[0].length;
        this.player = blocks.find(b => b.id === 1);
        // this.cost = gval + this.calculateHval(); // A*
        this.cost = gval; // Breadth first search
    }

    // Unique indentifier for this state (assumes blocks are always in same order)
    get id() {
        return this.blocks.map(b => '' + b.x + b.y).join('');
    }

    // If player is at goal 
    get solved() {
        return this.player.x + this.player.w - 1 === this.goal.x;
    }


    // Heuristic: How many blocks are in the goal path
    // + player distance to goal
    calculateHval() {
        // Distance to goal
        let res = this.goal.x - (this.player.x + this.player.w - 1);
        // Count the number of true values in goal row (excluding player)
        res += this.grid[this.goal.y].filter(Boolean).length - this.player.w;
        return res;
    }

    static updateGrid(m: Move, b: Block, grid: boolean[][]) {
        // Make copy of grid
        const gridCopy = grid.map(arr => arr.slice());
        // Id mismatch
        if (b.id !== m.blockId) return gridCopy;
        // Make a copy
        const newBlock = b.copy();
        // Update the position
        newBlock[b.dir] += m.n;
        // Update grid
        if (b.dir === 'x') {
            Array.from({length: b.w}).forEach((_, idx) => {
                gridCopy[b.y][b.x + idx] = false;
            });
            Array.from({length: b.w}).forEach((_, idx) => {
                gridCopy[newBlock.y][newBlock.x + idx] = true;
            });
        } else {
            Array.from({length: b.h}).forEach((_, idx) => {
                gridCopy[b.y + idx][b.x] = false;
            });
            Array.from({length: b.h}).forEach((_, idx) => {
                gridCopy[newBlock.y + idx][newBlock.x] = true;
            });
        }

        return gridCopy;
    }

    getChildren() {
        const res: State[] = [];
        this.blocks.forEach((block, idx) => {
            this.legalMoves(block).forEach(n => {
                // Create move and get updated grid
                const move = new Move(block.id, n);
                const newGrid = State.updateGrid(move, block, this.grid);
                // Create a new block with moved coords
                const newBlock = block.copy();
                newBlock[newBlock.dir] += n;
                // Create new blocks array, replace old block with updated
                const newBlocks = this.blocks.slice();
                newBlocks[idx] = newBlock;
                // Add new state to result
                res.push(new State(newBlocks, newGrid, this.gval + 1, move, this, this.goal));
            });
        });
        return res;
    }

    legalMoves(b: Block): number[] {
        const res = [];
        // Block is horizontal
        if (b.dir === 'x') {
            let x = b.x - 1;
            // Check negative moves
            while (x >= 0) {
                if (!this.grid[b.y][x])
                    res.push(x - b.x);
                else
                    break;
                x--;
            }
            x = b.x + b.w;
            // Check positive moves
            while (x < this.cols) {
                if (!this.grid[b.y][x])
                    res.push(x - (b.x + b.w - 1));
                else
                    break;
                x++;
            }
        } else {
        // Block is vertical
            let y = b.y - 1;
            // Check negative moves
            while (y >= 0) {
                if (!this.grid[y][b.x])
                    res.push(y - b.y);
                else
                    break;
                y--;
            }
            y = b.y + b.h;
            // Check positive moves
            while (y < this.rows) {
                if (!this.grid[y][b.x])
                    res.push(y - (b.y + b.h - 1));
                else
                    break;
                y++;
            }
        }

        return res;
    }

    static createInitState(blocks: Block[], n = 6, goal: P5.Vector = new P5.Vector().set(5, 2)): State {
        // Init grid
        let grid = Array.from({ length: n }).map(_ =>
            Array.from({ length: n }).map(_ => false)
        );
        // Setup grid with unmoved blocks
        blocks.forEach(b => grid = State.updateGrid(new Move(b.id, 0), b, grid));
        return new State(blocks, grid, 0, new Move(0, 0), undefined, goal);
    }

    static extractSolutionMoves(state: State) {
        const solution: Move[] = [];
        while (state) {
			solution.push(state.move);
			state = state.parent;
		}
		return solution.reverse().slice(1); // Remove initial 0 move

    }
}