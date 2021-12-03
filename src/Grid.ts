import P5 from "p5";
import { Block, Move } from './types';

export default class Grid {

    private _blockId = 2;
    private _size: number;
    private _solution: Move[];

    private _blocks: Block[] = [];
    private _player: Block;
    private _goal: P5.Vector;
    private _grid: number[][];

    constructor(
        private p5: P5,
        n: number = 6,
        player: Block = new Block(0, 2, 2, 1, 1),
        goal: P5.Vector = new P5.Vector().set(5, 2)
    ) {
        this._size = n;
        this._grid = Array.from({ length: n }).map(_ =>
            Array.from({ length: n }).map(_ => 0)
        );
        this._player = player;
        this._goal = goal;
        this.addBlock(player);
    }

    get player() {
        return this._player;
    }

    set player(p: Block) {
        this._player = p;
    }

    get goal() {
        return new P5.Vector().set(this._goal);
    }

    get size() {
        return this._size;
    }

    get id() {
        let res = '';
        this._grid.forEach(row => {
            res += row.join('');
        });
        return res;
    }


    inBounds(b: Block): Boolean {
        const { x, y, w, h, id } = b;
        return x >= 0 && y >= 0 && w > 0 && h > 0 && x + w <= this._size && y + h <= this._size;
    }

    checkGrid(b: Block) {
        const { x, y, w, h } = b;
        const widthNotBlocked = Array.from({length: w}).every((_, idx) => {
            return this.inBounds(b) && this._grid[y][x + idx] === 0;
        });
        const heightNotBlocked = Array.from({length: h}).every((_, idx) => {
            return this.inBounds(b) && this._grid[y + idx][x] === 0;
        });
        return widthNotBlocked && heightNotBlocked;
    }

    updateGrid(b: Block, add=true) {
        const {x, y, w, h, id} = b;
        Array.from({length: w}).forEach((_, idx) => {
            this._grid[y][x + idx] = add ? id : 0;
        });
        Array.from({length: h}).forEach((_, idx) => {
            this._grid[y + idx][x] = add ? id : 0;
        });
        return true;
    }

    addBlock(b: Block, safe = false): Boolean {
        // In case block is undefined
        if (!b) return false;

        // Check if grid is empty
        if (!this.checkGrid(b)) return false;

        // Add id if new block
        b.id = b.id || this._blockId++;

        // Add block id to grid
        this.updateGrid(b);

        // Add to blocks array
        this._blocks.push(b);

        // Reset solution if block added outside solve
        if (!safe) this._solution = [];

        // Success
        return true;
    }

    findBlockAt(x: number, y: number): Block {
        const id = this._grid[y][x];
        return this._blocks.find(block => block.id === id);
    }

    removeBlock(b: Block): Block {
        // Find index of block if exists
        const idx = this._blocks.findIndex(block => block.id === b?.id);
        let removed: Block;
        if (idx >= 0) {
            removed = this._blocks.splice(idx, 1)[0]; // Get removed block
            this.updateGrid(removed, false);
        }
        return removed;
    }

    legalMove(b: Block, m: Move): Boolean {
        // Create a copy that is "moved"
        const newBlock = b.copy();

        // Remove block from grid before checking
        this.removeBlock(b);

        const success = Array.from({length: m.n * m.dir}).every(_ => {
            newBlock[b.dir] += m.dir;
            return this.checkGrid(newBlock);
        });

        // Return block into grid
        this.addBlock(b);

        return success;
    }

    moveBlock(b: Block, m: Move): Boolean {
        // Don't do anything if move is illegal
        if (!this.legalMove(b, m)) return false;
        
        // Remove block
        this.removeBlock(b);
        // Update position
        b[b.dir] += m.n;
        return this.addBlock(b, true);
    }

    solved() {
        // Check if the row of the player is empty in front of the player
        return this._grid[this.player.y].slice(this.player.x + this.player.w).every(x => !x);
    }

    draw(blockSize: number, margin = 5) {
        const p5 = this.p5;
        this.drawGrid(blockSize);
        this.drawBlocks(blockSize, margin);

        // Draw goal
        p5.push();
        p5.fill(100, 255, 100);
        p5.translate(this.goal.mult(blockSize));
        p5.rect(0, 0, blockSize, blockSize);
        p5.pop();
    }

    drawBlocks(blockSize, margin = 5) {
        const p5 = this.p5;
        p5.stroke(0);
        p5.strokeWeight(2);
        this._blocks.forEach(b => {
            p5.push();
            // Fill red if player, gray otherwise
            p5.fill(b.id === 1 ? 255 : 100, 100, 100);
            // Translate by block position
            p5.translate(b.pos.mult(blockSize).add(margin, margin));
            // Define size
            const size = b.size.mult(blockSize).sub(2 * margin, 2 * margin);
            // Draw in local coord system
            p5.rect(0, 0, size.x, size.y);
            p5.pop();
        });
    }

    drawGrid(blockSize: number) {
        const p5 = this.p5;
        p5.stroke(0);
        p5.strokeWeight(2);
        Array.from({length: this._size}).forEach((_, idx) => {
            idx += 1;
            // Horizontal line
            p5.push();
            p5.translate(idx * blockSize, 0);
            p5.line(0, 0, 0, this._size * blockSize);
            p5.pop();

            // Vertical line
            p5.push();
            p5.translate(0, idx * blockSize)
            p5.line(0, 0, this._size * blockSize, 0);
            p5.pop();
        });
    }
}