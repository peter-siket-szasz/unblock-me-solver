class Grid {

    private _blockId = 2;
    private _size: number;
    private _solution: Move[];

    private _blocks: Block[];
    private _player: Block;
    private _goal: Coord;
    private _grid: number[][];

    constructor(n: number = 6,
        player: Block = new Block(0, 2, 2, 1, 1),
        goal: Coord = { x: 5, y: 2 }
    ) {

        this._grid = Array.from({ length: n }).map(_ =>
            Array.from({ length: n }).map(_ => 0)
        );
        this._player = player;
        this._goal = goal;
        this.addBlock(player);
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

    removeBlock(b: Block): Block {
        // Find index of block if exists
        const idx = this._blocks.findIndex(block => block.id === b.id);
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
        return this.addBlock(b);
    }

    solved() {
        // Check if the row of the player is empty in front of the player
        return this._grid[this._player.y].slice(this._player.x + this._player.w).every(x => !x);
    }
}