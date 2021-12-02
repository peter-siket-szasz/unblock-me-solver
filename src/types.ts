class Block {
    dir: 'x' | 'y';

    constructor(
        public x: number,
        public y: number,
        public w: number,
        public h: number,
        public id?: number
    ) {
        this.dir = w > h ? 'x' : 'y';
    }

    copy() {
        return new Block(this.x, this.y, this.w, this.h, this.id);
    }
}

interface Coord {
    x: number,
    y: number
}

class Move {
    dir: 1 | -1;
    constructor(
        public blockId: number,
        public n: number
    ) {
        this.dir = n > 0 ? 1 : -1;
    }
}