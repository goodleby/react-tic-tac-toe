import './Square.css';

export const Square = (props) => (
  <button
    className={`square ${props.highlight ? 'highlight' : ''}`}
    onClick={props.onClick}
  >
    {props.value}
  </button>
);

export default Square;
