import State from './State';

export default class Search {
    constructor() {
    }

    static search(initState: State) {
        const visited = {};
        const frontier: State[] = [];
        let solution: State = undefined;
        // Add the initial state
        frontier.push(initState);
        
        // Keep track of search time
        const startTime = Date.now();
        // Get solution
        while (frontier.length > 0) {
            // Pop the first node in the frontier (Breadth first search)
            const node = frontier.shift();
            
            // Return if it's solution
            if (node.solved) {
                solution = node;
                break;
            }
            // Check if it's been expanded via a cheaper path
            if (visited[node.id] && visited[node.id] <= node.gval)
                continue;
            
            // Add to visited
            visited[node.id] = node.gval;

            // Generate children and insert into frontier
            frontier.push(...node.getChildren());
        }

        const duration = (Date.now() - startTime) / 1000
        console.log('Search duration: ', duration, 's');
        console.log(solution);
        return { solution, duration };
    }
}