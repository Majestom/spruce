import { XorO } from "../src/types";

export const checkForWin = (
  board: (XorO | undefined)[][],
  player: XorO
) => {
  const size = board.length;

  for (let i = 0; i < size; i++) {
    if (board[i].every((cell) => cell === player))
      return true;
  }

  for (let i = 0; i < size; i++) {
    if (board.every((row) => row[i] === player))
      return true;
  }

  if (board.every((row, i) => row[i] === player))
    return true;

  if (board.every((row, i) => row[size - i - 1] === player))
    return true;

  return false;
};

export const checkForDraw = (
  board: (XorO | undefined)[][]
) => {
  for (let row of board) {
    for (let square of row) {
      if (square === undefined) {
        return false;
      }
    }
  }
  return true;
};
