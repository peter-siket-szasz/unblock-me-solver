import State from './State';
import PriorityQueue from './PriorityQueue';

export default class Search {
    frontier: PriorityQueue<State>;
    visited: object; // To store visited states {id: gval}
    solution: State;

    constructor() {
    }

    search(initState: State) {
        // Initialize an empty frontier and reset visited
        this.initStatus();
        // Add the initial state
        this.frontier.push(initState);
        
        // Keep track of search time
        const startTime = Date.now();
        // Get solution
        this.solution = this.searchFrontier();
        console.log('Search duration: ', (Date.now() - startTime) / 1000, 's');
        console.log(this.solution);
        return this.solution;
    }

    initStatus() {
        this.frontier = new PriorityQueue((a, b) => a.cost < b.cost);
        this.visited = {};
    }

    searchFrontier(): State {
        let expandedNodes = 0;

        while (!this.frontier.isEmpty()) {
            if (expandedNodes % 10000 === 0) 
                console.log('Nodes expanded: ', expandedNodes);
            // Pop the next node (with lowest cost)
            const node = this.frontier.pop();
            // Return if it's solution
            if (node.solved) return node;
            // Add to visited
            this.visited[node.id] = node.gval;

            // Generate children and check if any are already visited by a cheaper path. If not then reopen
            let children = node.getChildren().filter(c => !(this.visited[c.id] >= c.gval));
            // Insert children into frontier
            this.frontier.push(...children);
            expandedNodes++;
        }

        return undefined;
    }
}