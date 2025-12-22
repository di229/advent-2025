import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readInputLines, day1, day1e } from './day1/day1.js';
import { readInputRanges, day2 } from './day2/day2.js';

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
  t.test("part 1 sample result is 1227775554", () => {
    assert.strictEqual(day2(sample), 1227775554);
  });

  t.test("part 1 result is 44487518055", () => {
    assert.strictEqual(day2(input), 44487518055);
  });
});
