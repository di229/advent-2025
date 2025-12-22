import { open } from 'node:fs/promises';

export async function readInputRanges(filepath) {
  let fd;
  const result = [];
  try {
    fd = await open(filepath, 'r');
    const data = await fd.readFile({
      encoding: "utf-8",
    });
    for (const range of data.split(',')) {
      const [start, end] = range.split('-');
      result.push({
        start: Number(start),
        end: Number(end),
      });
    }
  } finally {
    await fd?.close();
  }
  return result;
}

function nextInvalidId(n) {
  let result = '';
  const s = n.toString();
  if (s.length % 2 == 0) {
    const pat_s = s.substring(0, s.length / 2);
    const pat = Number(pat_s);
    const rest_s = s.substring(s.length / 2);
    const rest = Number(rest_s);
    if (rest > pat) {
      result = (pat + 1).toString() + (pat + 1).toString();
    } else {
      result = pat_s + pat_s;
    }
  } else {
    const len = Math.floor(s.length / 2);    
    let pat = '1';
    for (let i=0; i<len; i++) {
      pat += '0';
    }
    result = pat + pat;
  }
  return Number(result);
}

// input: Array of objects with 'start' and 'end' int members 
export function day2(input) {
  const result = [];
  for (const range of input) {
    const st = range['start'];
    const end = range['end'];
    for(let next = nextInvalidId(st); 
      next <= end; next = nextInvalidId(next + 1)) {
      result.push(next);
    }
  }
  return result.reduce((s,n) => s+n, 0);
}
