import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const getWinner = (squares) => {
  const combinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < combinations.length; i++) {
    const [a, b, c] = combinations[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { player: squares[a], combination: combinations[i] };
    }
  }
  return null;
};

const Square = (props) => (
  <button className={`square ${props.highlight ? 'highlight' : ''}`} onClick={props.onClick}>
    {props.value}
  </button>
);

class Board extends React.Component {
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

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
          xIsNext: true,
          winner: null,
          move: null,
        },
      ],
      currentStep: 0,
      sortAsc: true,
    };
  }

  handleClick(i) {
    const { history, currentStep } = this.state;
    const current = history[currentStep];
    const { winner, xIsNext } = current;
    const squares = current.squares.slice();
    if (winner || squares[i]) return;
    squares[i] = xIsNext ? 'X' : 'O';
    const next = {
      squares,
      winner: getWinner(squares),
      xIsNext: !xIsNext,
      move: i,
    };
    this.setState({
      currentStep: currentStep + 1,
      history: history.slice(0, currentStep + 1).concat([next]),
    });
  }

  jumpTo(i) {
    this.setState({ currentStep: i });
  }

  renderHistoryItem(i) {
    const { history, currentStep } = this.state;
    const move = history[i].move;
    let position = '';
    if (move !== null) {
      const row = Math.floor(move / 3);
      const col = move - 3 * row;
      position = `(${col}, ${row})`;
    }
    return (
      <li key={i} className={i === currentStep ? 'current' : ''}>
        <button onClick={() => this.jumpTo(i)}>
          {i === 0 ? 'Go to game start' : `Go to move #${i} ${position}`}
        </button>
      </li>
    );
  }

  renderHistory() {
    const items = this.state.history.map((_, i) => this.renderHistoryItem(i));
    return this.state.sortAsc ? items : items.reverse();
  }

  toggleSorting() {
    this.setState({ sortAsc: !this.state.sortAsc });
  }

  render() {
    const { history, currentStep } = this.state;
    const current = history[currentStep];
    const { winner, xIsNext } = current;
    let status;
    if (winner) status = `Winner: ${winner.player}`;
    else if (current.squares.every((item) => !!item)) status = `It's a draw!`;
    else status = `Next player: ${xIsNext ? 'X' : 'O'}`;
    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            highlight={winner ? winner.combination : []}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <button onClick={() => this.toggleSorting()}>Toggle order</button>
          <ol>{this.renderHistory()}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById('root'));
