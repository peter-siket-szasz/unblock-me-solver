// Adapted to TS from here:
// https://stackoverflow.com/questions/42919469/efficient-way-to-implement-priority-queue-in-javascript
class PriorityQueue<T> {
    
    private top = 0;
    private parent = i => ((i + 1) >>> 1) - 1;
    private left = i => (i << 1) + 1;
    private right = i => (i + 1) << 1;

    private _heap: T[];
    private _comparator: (a: T, b: T) => Boolean;
    
    constructor(comparator: (a: T, b: T) => Boolean = (a: T, b: T) => a > b) {
        this._heap = [];
        this._comparator = comparator;
    }

    size() {
        return this._heap.length;
    }

    isEmpty() {
        return this.size() == 0;
    }

    peek() {
        return this._heap[this.top];
    }
    push(...values) {
        values.forEach(value => {
            this._heap.push(value);
            this._siftUp();
        });
        return this.size();
    }
    pop() {
        const poppedValue = this.peek();
        const bottom = this.size() - 1;
        if (bottom > this.top) {
            this._swap(this.top, bottom);
        }
        this._heap.pop();
        this._siftDown();
        return poppedValue;
    }
    replace(value) {
        const replacedValue = this.peek();
        this._heap[this.top] = value;
        this._siftDown();
        return replacedValue;
    }
    _greater(i, j) {
        return this._comparator(this._heap[i], this._heap[j]);
    }
    _swap(i, j) {
        [this._heap[i], this._heap[j]] = [this._heap[j], this._heap[i]];
    }
    _siftUp() {
        let node = this.size() - 1;
        while (node > this.top && this._greater(node, this.parent(node))) {
            this._swap(node, this.parent(node));
            node = this.parent(node);
        }
    }
    _siftDown() {
        let node = this.top;
        while (
            (this.left(node) < this.size() && this._greater(this.left(node), node)) ||
            (this.right(node) < this.size() && this._greater(this.right(node), node))
        ) {
            let maxChild = (this.right(node) < this.size() && this._greater(this.right(node), this.left(node))) ? this.right(node) : this.left(node);
            this._swap(node, maxChild);
            node = maxChild;
        }
    }
}