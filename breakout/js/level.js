import Brick from "/js/brick.js";
export const level1 = [
  [0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
  // [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  // [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  // [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];
export const level2 = [
  [0, 0, 1, 0, 0, 1, 0, 0, 1, 0],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

export function buildLevel(game, level) {
  let bricks = [];
  level.forEach((row, rowIndex) => {
    row.forEach((brick, brickIndex) => {
      if (level[rowIndex][brickIndex] != 0)
        bricks.push(
          new Brick(game, { x: 20 + brickIndex * 76, y: 20 + 30 * rowIndex })
        );
    });
  });
  return bricks;
}
