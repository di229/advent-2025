import { open } from 'node:fs/promises';

export async function readInputLines(filepath) {
  const arr = [];
  const fd = await open(filepath, 'r');
  try {
    for await (const line of fd.readLines()) {
      arr.push(line);
    }
  } finally {
    await fd.close();
  }
  return arr;
}

export function day1(input) {
  let zeros = 0;
  let position = 50;
  for (const step of input) {
    const dir = step.substring(0,1);
    const amt = parseInt(step.substring(1));
    if (dir === 'L') {
      position = (position - amt ) % 100;
    }
    else if (dir === 'R') {
      position = (position + amt ) % 100;
    }
    else {
      throw new Error("Input format");
    }
    if (position === 0) {
      zeros += 1;
    }
  }
  return zeros;
}

export function day1e(input) {
  let zeros = 0;
  let position = 50;
  const invert = (pos) => (pos === 0) ? 0 : 100 - pos;
  for (const step of input) {
    const dir = step.substring(0,1);
    const amt = parseInt(step.substring(1));
    if (dir === 'L') {
      zeros += Math.floor((invert(position) + amt) / 100);
      position = invert((invert(position) + amt) % 100);
    }
    else if (dir === 'R') {
      zeros += Math.floor((position + amt) / 100);
      position = (position + amt) % 100;
    }
    else {
      throw new Error("Input format");
    }
  }
  return zeros;
}
