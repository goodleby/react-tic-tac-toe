import React from 'react';
import './Board.css';
import { Square } from './Square';

export class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        key={i}
        highlight={this.props.highlight.indexOf(i) !== -1}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  renderRow(i) {
    return (
      <div key={i} className="board-row">
        {Array(3)
          .fill(null)
          .map((_, j) => this.renderSquare(3 * i + j))}
      </div>
    );
  }

  render() {
    return (
      <div>
        {Array(3)
          .fill(null)
          .map((_, i) => this.renderRow(i))}
      </div>
    );
  }
}

export default Board;
