import React, { Component, Fragment } from "react";
import Cell from "./Cell/Cell";
import "./PathfindingVisualization.css";
import bfs from "./algos/bfs";
import { getNodesInShortestPath } from "./algos/bfs";
import Navbar from "./Navbar/Navbar";
import { MDBContainer, MDBRow, MDBCol, MDBFooter } from "mdbreact";

import dfs from "./algos/dfs";

const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;

export default class PathfindingVisualization extends Component {
  constructor() {
    super();
    this.state = {
      grid: [],
      mouseIsPressed: false,
    };
  }

  componentDidMount() {
    const grid = this.createInitialGrid();
    this.setState({ grid: grid });
  }

  createInitialGrid() {
    const grid = [];
    for (let row = 0; row < 20; row++) {
      const currentRow = [];
      for (let col = 0; col < 50; col++) {
        currentRow.push(this.createCell(col, row));
      }
      grid.push(currentRow);
    }

    return grid;
  }

  createCell(col, row) {
    return {
      col,
      row,
      isStart: row === START_NODE_ROW && col === START_NODE_COL,
      isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
      distance: Infinity,
      isVisited: false,
      isWall: false,
      previousNode: null,
    };
  }

  handleMouseDown(row, col) {
    const newGrid = this.createNewGridWithWalls(this.state.grid, row, col);
    this.setState({ grid: newGrid, mouseIsPressed: true });
  }

  handleMouseClick(row, col) {
    if (!this.state.mouseIsPressed) return;
    const newGrid = this.createNewGridWithWalls(this.state.grid, row, col);
    this.setState({ grid: newGrid });
  }

  handleMouseUp() {
    this.setState({ mouseIsPressed: false });
  }

  createNewGridWithWalls(grid, row, col) {
    const newGrid = grid.slice();
    const cell = newGrid[row][col];
    const newCell = {
      ...cell,
      isWall: !cell.isWall,
    };
    newGrid[row][col] = newCell;
    return newGrid;
  }

  startBFSVisualization() {
    const { grid } = this.state;
    const startCell = grid[START_NODE_ROW][START_NODE_COL];
    const targetCell = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visistedCells = bfs(grid, startCell, targetCell);
    const shortestPathNodes = getNodesInShortestPath(targetCell);
    this.animateBfs(visistedCells, shortestPathNodes);
  }

  animateShortestPath(shortestPathNodes) {
    for (let i = 0; i < shortestPathNodes.length; i++) {
      setTimeout(() => {
        const node = shortestPathNodes[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-shortest-path";
      }, 50 * i);
    }
  }

  animateBfs(visitedCells, shortestPathNodes) {
    for (let i = 0; i <= visitedCells.length; i++) {
      if (i === visitedCells.length) {
        setTimeout(() => {
          this.animateShortestPath(shortestPathNodes);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedCells[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-visited";
      }, 10 * i);
    }
  }

  startDFSVisualization() {
    const { grid } = this.state;
    const startCell = grid[START_NODE_ROW][START_NODE_COL];
    const targetCell = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visistedCells = dfs(grid, startCell, targetCell);
    const shortestPathNodes = getNodesInShortestPath(targetCell);
    this.animateBfs(visistedCells, shortestPathNodes);
  }

  render() {
    const { grid, mouseIsPressed } = this.state;

    return (
      <>
        <MDBContainer
          fluid
          className="cloudy-knoxville-gradient"
        ></MDBContainer>

        <button onClick={() => this.startBFSVisualization()}>
          Visualize BFS Algorithm
        </button>
        <button onClick={() => this.startDFSVisualization()}>
          Visualize DFS Algorithm
        </button>

        <div className="grid">
          {grid.map((row, rowIdx) => {
            return (
              <div key={rowIdx}>
                {row.map((node, nodeIdx) => {
                  const { row, col, isFinish, isStart, isWall } = node;
                  return (
                    <Cell
                      key={nodeIdx}
                      col={col}
                      isFinish={isFinish}
                      isStart={isStart}
                      isWall={isWall}
                      mouseIsPressed={mouseIsPressed}
                      onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                      onMouseClick={(row, col) =>
                        this.handleMouseClick(row, col)
                      }
                      onMouseUp={() => this.handleMouseUp()}
                      row={row}
                    ></Cell>
                  );
                })}
              </div>
            );
          })}
        </div>
      </>
    );
  }
}
