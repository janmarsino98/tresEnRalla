import { useState } from "react";
import "./App.css";
import BoardGame from "./components/BoardGame";

const TURNS = {
  X: "x",
  O: "o",
};

const Tile = ({ children, updateBoard, index, isSelected }) => {
  const handleClick = () => {
    updateBoard(index);
  };

  return (
    <div
      className={isSelected ? "board-tile selected" : "board-tile"}
      onClick={handleClick}
    >
      {children}
    </div>
  );
};

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState(TURNS.X);
  const [winner, setWinner] = useState(null);

  const checkRowWinner = () => {
    for (let i = 0; i < 3; i++) {
      if (board[3 * i]) {
        if (
          board[3 * i] === board[3 * i + 1] &&
          board[3 * i] === board[3 * i + 2]
        ) {
          setWinner(board[3 * i]);
          return;
        }
      }
    }
    return false;
  };

  const checkColumnWinner = (board) => {
    for (let i = 0; i < 3; i++) {
      if (board[i]) {
        if (board[i] === board[i + 3] && board[i] === board[i + 6]) {
          setWinner(board[i]);
          return;
        }
      }
    }
    return false;
  };

  const checkDiagonalWinner = (board) => {
    if (board[0]) {
      if (board[0] === board[4] && board[0] === board[8]) {
        setWinner(board[0]);
        return;
      }
    } else if (board[6]) {
      if (board[6] === board[4] && board[6] === board[2]) {
        setWinner(board[6]);
        return;
      }
    }
    return false;
  };

  const checkDraw = (board) => {
    for (let i = 0; i < board.length; i++) {
      if (!board[i]) {
        return false;
      }
    }
    setWinner("Draw");
    return;
  };
  const checkWinner = (board) => {
    return (
      checkRowWinner(board) ||
      checkColumnWinner(board) ||
      checkDiagonalWinner(board) ||
      checkDraw(board)
    );
  };

  const updateBoard = (index) => {
    if (board[index] || winner) return;
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);
    const newWinner = checkWinner(newBoard);
    if (newWinner) setWinner(newWinner);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);
  };
  return (
    <>
      <main>
        <section className="board-container">
          {board.map((_, index) => {
            return (
              <Tile key={index} index={index} updateBoard={updateBoard}>
                {board[index]}
              </Tile>
            );
          })}
        </section>
        <section className="turn-container">
          <Tile isSelected={turn === TURNS.X}>{TURNS.X}</Tile>
          <Tile isSelected={turn === TURNS.O}>{TURNS.O}</Tile>
        </section>
        {winner && (
          <section className="modal-container">
            <div className="modal-content">
              <span>
                {winner == "Draw" ? "There was a draw" : winner + " won!"}
              </span>
              <button onClick={resetGame} className="modal-button">
                Reset Game
              </button>
            </div>
          </section>
        )}
      </main>
    </>
  );
}

export default App;
