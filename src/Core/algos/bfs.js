export default function bfs(grid, startNode, targetNode) {
    // console.log(startNode);
    // console.log(targetNode);
  const visitedCells = [];
  const queue = [];
  queue.push(startNode);
//   console.log(queue)
  while (queue.length > 0) {
    let curNode = queue.shift();
    if (curNode.isWall) continue;
    curNode.isVisited = true;
    visitedCells.push(curNode);
    if (curNode === targetNode) return visitedCells;
    addNeighborsToQueue(curNode, grid, queue);
  }

  return visitedCells;
}

function addNeighborsToQueue(node, grid, queue) {
  const unvisistedNodes = getUnvisitedNodes(node, grid);
  for (const ng of unvisistedNodes) {
    ng.previousNode = node;
    ng.isVisited = true;
    queue.push(ng);
  }
}

function getUnvisitedNodes(node, grid) {
  const ng = [];
  const { col, row } = node;
  if (row < grid.length - 1) ng.push(grid[row + 1][col]);
  if (col < grid[0].length - 1) ng.push(grid[row][col + 1]);
  if (row > 0) ng.push(grid[row - 1][col]);
  if (col > 0) ng.push(grid[row][col  - 1]);
  return ng.filter(x => !x.isVisited);
}

export function getNodesInShortestPath(targetNode) {
    const shortestPathNodes = [];
    let curNode = targetNode;
    while(curNode != null) {
        shortestPathNodes.unshift(curNode);
        curNode = curNode.previousNode;
    }
    return shortestPathNodes;
}