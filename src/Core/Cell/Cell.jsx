import React from "react";
import { Component } from "react";

import "./Cell.css";

export default class Cell extends Component {
  render() {
    const {
      row,
      col,
      isFinish,
      isStart,
      isWall,
      onMouseDown,
      onMouseClick,
      onMouseUp,
    } = this.props;
    const newClassName = isFinish
      ? 'node-finish'
      : isStart
      ? 'node-start'
      : isWall
      ? 'node-wall'
      : '';
    return (
      <div
        id={`node-${row}-${col}`}
        className={`node ${newClassName}`}
        onMouseDown={() => onMouseDown(row, col)}
        onMouseEnter={() => onMouseClick(row, col)}
        onMouseUp={() => onMouseUp()}
      ></div>
    );
  }
}
