import React, { useEffect, useState } from "react";
import { XorO } from "./types";
import {
  checkForWin,
  checkForDraw,
} from "../utils/helperFuncs";

const generateBoard = (boardSize: number) => {
  return Array.from({ length: boardSize }, () =>
    Array.from({ length: boardSize }, () => undefined)
  );
};

export const Main = () => {
  const [boardSize, setBoardSize] = useState<number>(3);
  const initialBoard = generateBoard(boardSize);
  const [board, setBoard] =
    useState<(XorO | undefined)[][]>(initialBoard);

  useEffect(() => {
    setBoard(generateBoard(boardSize));
  }, [boardSize]);

  const [currentPlayer, setCurrentPlayer] =
    useState<XorO>("X");

  const [winStatus, setWinStatus] = useState<string>("");

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
          <div className="flex flex-col justify-center items-center space-y-4">
            <p>{winStatus}</p>
            <button
              className="bg-black hover:bg-black-700 text-white font-bold py-2 px-4 rounded"
              onClick={resetGame}
            >
              Reset Game
            </button>
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center gap-4">
            <p>{`Current player: ${currentPlayer}`}</p>
            <p>{`Current board size: ${boardSize}`}</p>
            <input
              className="border-2 border-black rounded"
              type="number"
              value={boardSize}
              onChange={(e) =>
                setBoardSize(parseInt(e.target.value, 10))
              }
            />
          </div>
        )}
      </div>
    </div>
  );
};
