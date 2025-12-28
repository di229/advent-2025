import { readFile } from 'node:fs/promises';

class Grid {
  constructor(rowLen, data) {
    this.rowLen = rowLen;
    this.data = data;
  }
}

export async function readGrid(filepath) {
  const data = await readFile(filepath);
  return new Grid(
    data.indexOf('\n'),
    data.filter(x => x !== 0xa).toString('utf-8'));
}

export function day4(grid) {
  // grid is represented by an array, grid.data and a row length, grid.rowLen
  // 8 adjacent positions, with relative row position:
  const neighbours = [ 
      [-1, -grid.rowLen - 1], [-1, -grid.rowLen] , [-1, 1 - grid.rowLen], 
      [0, -1] , [0, 1],
      [1, grid.rowLen - 1], [1, grid.rowLen], [1, grid.rowLen + 1],
  ];
  const valid = (mid, rrow, nidx) => {  
    // test if a given `nidx` is a valid neighbour index to a midpoint `mid`, 
    // given its expected relative row `rrow`.
    if (nidx < 0 || nidx > grid.data.length) {
      return false;
    }
    if (Math.floor(mid / grid.rowLen) + rrow !== Math.floor(nidx / grid.rowLen)) {
      return false;
    }
    return true;
  }
  const scores = new Array(grid.data.length);
  scores.fill(0);
  for (let i=0; i < grid.data.length; i++) {
    // if a grid position contains a paper roll, add 1 to all of its valid 
    // neighbours' scores
    if (grid.data[i] !== '@') {
      continue;
    }
    for (const n of neighbours) {
      const rrow = n[0];
      const nidx = i + n[1];
      if (valid(i, rrow, nidx)) {
        scores[nidx] += 1;
      }
    }
  }
  // count the number of paper rolls with a score < 4
  let accessible = 0;
  for (let i=0; i < grid.data.length; i++) {
    if (grid.data[i] == '@' && scores[i] < 4) {
      accessible += 1;
    }
  }
  return accessible;
}
