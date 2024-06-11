import { checkForWin } from "../../utils/helperFuncs";
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
