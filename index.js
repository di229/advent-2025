import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readInputLines, day1, day1e } from './day1/day1.js';
import { readInputRanges, day2 } from './day2/day2.js';
import { day3 } from './day3/day3.js';
import { readGrid, day4, day4e } from './day4/day4.js';
import { day5 } from './day5/day5.js';

await test("Day 1", t => {
  t.test("part 1 sample result is 3", async () => {
    assert.strictEqual(day1(await readInputLines('day1/inputs/sample')), 3);
  });

  t.test("part 1 result is 1172", async () => {
    assert.strictEqual(day1(await readInputLines('day1/inputs/input')), 1172);
  });

  t.test("part 2 sample result is 6", async () => {
    assert.strictEqual(day1e(await readInputLines('day1/inputs/sample')), 6);
  });

  t.test("part 2 result is 6932", async () => {
    assert.strictEqual(day1e(await readInputLines('day1/inputs/input')), 6932);
  });
});

await test("Day 2", async t => {
  const sample = await readInputRanges('day2/inputs/sample');
  const input = await readInputRanges('day2/inputs/input');
  await t.test("part 1 sample result is 1227775554", () => {
    assert.strictEqual(day2(sample), 1227775554);
  });

  await t.test("part 1 result is 44487518055", () => {
    assert.strictEqual(day2(input), 44487518055);
  });
});

await test("Day 3", async t => {
  const sample = await readInputLines('day3/inputs/sample');
  await t.test("part 1 sample result is 357", () => {
    assert.strictEqual(day3(sample), 357);
  });
  const input = await readInputLines('day3/inputs/input');
  await t.test("part 1 result is 16887", () => {
    assert.strictEqual(day3(input), 16887);
  });
});

await test("Day 4", async t => {
  const sampleGrid = await readGrid('day4/inputs/sample');
  await t.test("part 1 sample result is 13", () => {
    assert.strictEqual(day4(sampleGrid), 13);
  });
  const inputGrid = await readGrid('day4/inputs/input');
  await t.test("part 1 result is 1547", () => {
    assert.strictEqual(day4(inputGrid), 1547);
  });
  await t.test("part 2 sample result is 43", () => {
    assert.strictEqual(day4e(sampleGrid), 43);
  });
  await t.test("part 2 result is 8948", () => {
    assert.strictEqual(day4e(inputGrid), 8948);
  });
});

await test("Day 5", async t => {
  t.test("part 1 sample result is 3", async () => {
    const r = await day5("day5/inputs/sample");
    assert.strictEqual(r, 3);
  });
  t.test("part 1 result is 674", async () => {
    const r = await day5("day5/inputs/input");
    assert.strictEqual(r, 674);
  });
});
