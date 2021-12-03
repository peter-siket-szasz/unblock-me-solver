import P5 from "p5";

export class Block {
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

    get pos(): P5.Vector {
        return new P5.Vector().set(this.x, this.y);
    }

    get size(): P5.Vector {
        return new P5.Vector().set(this.w, this.h);
    }

    copy() {
        return new Block(this.x, this.y, this.w, this.h, this.id);
    }
}

export interface Coord {
    x: number,
    y: number
}

export class Move {
    dir: 1 | -1;
    constructor(
        public blockId: number,
        public n: number
    ) {
        this.dir = n > 0 ? 1 : -1;
    }
}