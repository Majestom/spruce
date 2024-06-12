import {
  checkForWin,
  checkForDraw,
} from "../../utils/helperFuncs";
import { XorO } from "../types";

describe("checkForWin", () => {
  it("should return true when a row is filled with the same symbol", () => {
    const board: (XorO | undefined)[][] = [
      ["X", "X", "X"],
      [undefined, "O", undefined],
      [undefined, undefined, "O"],
    ];
    expect(checkForWin(board, "X")).toBe(true);
  });

  it("should return true when a column is filled with the same symbol", () => {
    const board: (XorO | undefined)[][] = [
      ["X", undefined, "O"],
      ["X", "O", undefined],
      ["X", undefined, "O"],
    ];
    expect(checkForWin(board, "X")).toBe(true);
  });

  it("should return true when a diagonal is filled with the same symbol", () => {
    const board: (XorO | undefined)[][] = [
      ["X", undefined, "O"],
      [undefined, "X", undefined],
      ["O", undefined, "X"],
    ];
    expect(checkForWin(board, "X")).toBe(true);
  });

  it("should return false when no row, column, or diagonal is filled with the same symbol", () => {
    const board: (XorO | undefined)[][] = [
      ["X", "O", "X"],
      ["O", "X", "O"],
      ["O", "X", "O"],
    ];
    expect(checkForWin(board, "X")).toBe(false);
  });
});

describe("checkForDraw", () => {
  it("should return true when all squares are filled and no player has won", () => {
    const board: (XorO | undefined)[][] = [
      ["X", "O", "X"],
      ["O", "X", "O"],
      ["O", "X", "O"],
    ];
    expect(checkForDraw(board)).toBe(true);
  });

  it("should return false when there are empty squares", () => {
    const board: (XorO | undefined)[][] = [
      ["X", "O", "X"],
      ["O", undefined, "O"],
      ["O", "X", "O"],
    ];
    expect(checkForDraw(board)).toBe(false);
  });

  it("should return false when a player has won", () => {
    const board: (XorO | undefined)[][] = [
      ["X", "X", "X"],
      ["O", undefined, "O"],
      ["O", "X", "O"],
    ];
    expect(checkForDraw(board)).toBe(false);
  });
});

describe("varying board sizes", () => {
  it("should return correct result for 2x2 board", () => {
    const board: (XorO | undefined)[][] = [
      ["X", "O"],
      ["O", "X"],
    ];
    expect(checkForDraw(board)).toBe(true);

    board[1][1] = undefined;
    expect(checkForDraw(board)).toBe(false);
  });

  it("should return correct result for 4x4 board", () => {
    const board: (XorO | undefined)[][] = [
      ["X", "O", "X", "O"],
      ["O", "X", "O", "X"],
      ["X", "O", "X", "O"],
      ["O", "X", "O", "X"],
    ];
    expect(checkForDraw(board)).toBe(true);

    board[3][3] = undefined;
    expect(checkForDraw(board)).toBe(false);
  });
});
