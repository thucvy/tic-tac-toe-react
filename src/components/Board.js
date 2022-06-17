import { useState } from "react";
import { Button } from "react-bootstrap";
import "./Board.css";
import Square from "./Square";

export default function Board() {
  const [squares, setSquares] = useState(new Array(9).fill(null));
  const [isPlayX, setIsPlayX] = useState(true);
  const [squareDisabled, setSquareDisabled] = useState(false);
  const [winner, setWinner] = useState(null);

  const restartGame = () => {
    setSquares(new Array(9).fill(null));
    setIsPlayX(true);
    setSquareDisabled(false);
    setWinner(null);
  };

  const handleClick = (index) => {
    if (squares[index] || squareDisabled) return;
    if (isPlayX) {
      squares[index] = "X";
    } else {
      squares[index] = "O";
    }
    setSquares(squares);
    determineWinner();
    setIsPlayX(!isPlayX);
  };

  let currentPlayer = isPlayX ? "X" : "O";

  const determineWinner = () => {
    winningPatterns.forEach((pattern) => {
      const [a, b, c] = pattern; //call out the elements in each winning pattern array
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        setWinner(currentPlayer);
        setSquareDisabled(true);
      }
    });
  };

  const renderedSquares = squares.map((square, idx) => (
    <Square
      key={idx}
      player={square}
      onClick={() => handleClick(idx)}
      squareDisabled={squareDisabled}
    />
  ));

  return (
    <div>
      <h1 className="my-4">'TIS TIC-TAC-TOE TIME</h1>
      {!winner ? (
        <h3>
          Next Player: <b>{currentPlayer}</b>
        </h3>
      ) : (
        <h3>
          Winner: <b>{winner}</b>
        </h3>
      )}
      <div className="grid my-4">{renderedSquares}</div>
      <Button variant="outline-danger" onClick={restartGame}>
        Restart Game
      </Button>
    </div>
  );
}

const winningPatterns = [
  //horizontal
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  //vertical
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  //diagonal
  [0, 4, 8],
  [2, 4, 6],
];
