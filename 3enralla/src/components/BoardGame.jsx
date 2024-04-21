import React, { useState, useEffect } from "react";

const BoardGame = () => {
  const [playerTurn, setPlayerTurn] = useState(1);
  const [tiles, setTiles] = useState(Array(9).fill(null));
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    const checkWinner = (tiles) => {
      if (!tiles) {
        return;
      }
      for (let i = 0; i < 3; i++) {
        if (
          tiles[i * 3] === tiles[i * 3 + 1] &&
          tiles[i * 3 + 1] === tiles[i * 3 + 2]
        ) {
          if (tiles[i * 3] === "X") {
            setWinner("X");
          } else if (tiles[i * 3] === "O") {
            setWinner("O");
          }
        }
      }

      for (let i = 0; i < 3; i++) {
        if (tiles[i] === tiles[i + 3] && tiles[i + 3] === tiles[i + 6]) {
          if (tiles[i] === "X") {
            setWinner("X");
          } else if (tiles[i] === "O") {
            setWinner("O");
          }
        }
      }
    };

    checkWinner();
  }, [tiles]);

  const handleClick = (index) => {
    if (tiles[index]) {
      return;
    }

    const newTiles = [...tiles];
    newTiles[index] = playerTurn === 1 ? "X" : "O";

    setTiles(newTiles);

    setPlayerTurn(playerTurn === 1 ? 2 : 1);
  };
  return tiles.map((tile, index) => {
    return (
      <div
        className="board-tile"
        onClick={() => handleClick(index)}
        key={index}
      >
        {tile}
      </div>
    );
  });
};

export default BoardGame;
