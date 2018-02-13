export const makeGrid = (size) => {
  const grid = [];

  for (var i = 0; i < size; i++) {
    let rowArray = [];
    for (var r = 0; r < size; r++) {
      rowArray.push(0);
    }
    grid.push(rowArray);
  }

  return grid;
};

export const placeShipGrid = (grid, x, y, size, direction) => {
  if (typeof grid[y] === 'undefined' || typeof grid[y][x] === 'undefined') {
    return false;
  }

  let newGrid = grid.map(g => [...g]);

  for (var i = 0; i < size; i++) {
    if (direction === 'vertical') {
      if (typeof grid[y + i] === 'undefined' || grid[y + i][x] !== 0) {
        return false;
      }
      newGrid[y + i][x] = 's';
    } else {
      if (typeof grid[y][x + i] === 'undefined' || grid[y][x + i] !== 0) {
        return false;
      }
      newGrid[y][x + i] = 's';
    }
  }

  return newGrid;
};

export const markSalvoGrid = (grid, x, y, value) => {
  const MAP_VALUE_TO_GRID = {
    'HIT': 'x',
    'SUNK': 'x',
    'MISS': '*',
  };

  let newGrid = grid.map(g => [...g]);
  newGrid[y][x] = MAP_VALUE_TO_GRID[value];
  return newGrid;
};
