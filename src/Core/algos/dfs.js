export default function dfs(grid, startNode, targetNode) {
    const visitedCells = [];
    const stack = [];
    stack.push(startNode);
    while(stack.length > 0) {
        let curNode = stack.pop();
        if(curNode.isWall) continue;
        curNode.isVisited = true;
        visitedCells.push(curNode);
        if(curNode === targetNode) return visitedCells;
        pushNeighboursToStack(curNode, grid, stack);
    }
}

function pushNeighboursToStack(node, grid, stack) {
    const unvisitedNodes = getUnvisitedNeighbours(node, grid);
    for(const ng of unvisitedNodes) {
        ng.previousNode = node;
        stack.push(ng);
    }
}

function getUnvisitedNeighbours(node, grid) {
    const neighbours = [];
    const { col, row } = node;
    if (col < grid[0].length - 1) neighbours.push(grid[row][col + 1]);
    if (row < grid.length - 1) neighbours.push(grid[row + 1][col]);
    if (col > 0) neighbours.push(grid[row][col - 1]);
    if (row > 0) neighbours.push(grid[row - 1][col]);
    return neighbours.filter((neighbour) => !neighbour.isVisited);
}