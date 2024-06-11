import React, { useState } from "react";
import { XorO } from "./types";

export const Main = () => {
  const [board, setBoard] = useState<
    (XorO | undefined)[][]
  >([
    [undefined, undefined, undefined],
    [undefined, undefined, undefined],
    [undefined, undefined, undefined],
  ]);

  const [currentPlayer, setCurrentPlayer] =
    useState<XorO>("X");

  console.log("currentPlayer", currentPlayer);

  const checkForWin = (
    board: (XorO | undefined)[][],
    player: XorO
  ) => {
    for (let i = 0; i < 3; i++) {
      if (
        board[i][0] === player &&
        board[i][1] === player &&
        board[i][2] === player
      )
        return true;
      if (
        board[0][i] === player &&
        board[1][i] === player &&
        board[2][i] === player
      )
        return true;
    }

    if (
      board[0][0] === player &&
      board[1][1] === player &&
      board[2][2] === player
    )
      return true;
    if (
      board[0][2] === player &&
      board[1][1] === player &&
      board[2][0] === player
    )
      return true;

    return false;
  };

  const resetGame = () => {
    setBoard([
      [undefined, undefined, undefined],
      [undefined, undefined, undefined],
      [undefined, undefined, undefined],
    ]);
    setCurrentPlayer("X");
  };

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const button = event.currentTarget;
    const rowIndex = Number(
      button.getAttribute("data-row-index")
    );
    const columnIndex = Number(
      button.getAttribute("data-column-index")
    );

    if (board[rowIndex][columnIndex] !== undefined) return;

    const newBoard = [...board];
    newBoard[rowIndex][columnIndex] = currentPlayer;
    setBoard(newBoard);

    if (checkForWin(newBoard, currentPlayer)) {
      alert(`Player ${currentPlayer} wins!`);
      resetGame();
    } else {
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    }
  };

  return (
    <div className="flex flex-col mt-10 items-center gap-10">
      <div className="font-bold text-2xl">Tic Tac Toe</div>
      <div className="flex flex-col gap-1">
        {board.map((row, i) => (
          <div key={i} className="flex gap-1">
            {row.map((column, j) => (
              <button
                key={`${i}-${j}`}
                onClick={handleClick}
                data-row-index={i}
                data-column-index={j}
                className="border-2 border-gray-900 w-10 h-10 cursor-pointer items-center justify-center text-2xl font-bold flex"
              >
                {column}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
