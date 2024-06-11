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

  const [winStatus, setWinStatus] = useState<string>("");

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

  const checkForDraw = (board: (XorO | undefined)[][]) => {
    for (let row of board) {
      for (let square of row) {
        if (square === undefined) {
          return false;
        }
      }
    }
    return true;
  };

  const resetGame = () => {
    setBoard([
      [undefined, undefined, undefined],
      [undefined, undefined, undefined],
      [undefined, undefined, undefined],
    ]);
    setCurrentPlayer("X");
    setWinStatus("");
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

    if (winStatus !== "") return;

    const newBoard = [...board];
    newBoard[rowIndex][columnIndex] = currentPlayer;
    setBoard(newBoard);

    if (checkForWin(newBoard, currentPlayer)) {
      setWinStatus(`${currentPlayer} wins!`);
    } else if (checkForDraw(newBoard)) {
      setWinStatus("Draw!");
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
      <div className="font-bold text-2xl">
        {winStatus ? (
          <div className="flex flex-col justify-center items-center">
            <p>{winStatus}</p>
            <button
              className="bg-blue-500 hover:bg-black-700 text-white font-bold py-2 px-4 rounded"
              onClick={resetGame}
            >
              Reset Game
            </button>
          </div>
        ) : (
          `Current player: ${currentPlayer}`
        )}
      </div>
    </div>
  );
};
