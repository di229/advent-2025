import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readInputLines, day1 } from './day1/day1.js';

await test("Day 1 sample input", t => {
  t.test("sample result is 3", async () => {
    assert.strictEqual(day1(await readInputLines('day1/inputs/sample')), 3);
  });

  t.test("part 1 result is 1172", async () => {
    assert.strictEqual(day1(await readInputLines('day1/inputs/input')), 1172);
  });
});
