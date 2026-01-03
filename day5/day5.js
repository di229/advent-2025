import { readFile } from 'node:fs';

function insertSorted(sortedArray, elem, elemKey) {
  let i = 0;
  for (; i < sortedArray.length; i++) {
    if (elemKey(sortedArray[i]) > elemKey(elem)) {
      break;
    }
  }
  sortedArray.splice(i, 0, elem);
}

function insertSortedBinSearch(sortedArray, elem, elemKey) {
  function findInsPoint(array, start, end, elem, elemKey) {
    let mid = start + Math.floor((end - start) / 2);
    if (start == end) {
      return start;
    } else if (elemKey(array[mid]) >= elemKey(elem)) {
      return findInsPoint(array, start, mid, elem, elemKey);
    } else if (elemKey(array[mid]) <= elemKey(elem)) {
      return findInsPoint(array, mid+1, end, elem, elemKey);
    }
    throw new Error("element not found in list");
  }
  let i = findInsPoint(sortedArray, 0, sortedArray.length, elem, elemKey);
  sortedArray.splice(i, 0, elem);
}

// Given a list of pairs [[a0,b0],...,[aN, bN]], already sorted by first element
// such that a[n] >= a[n-1], where each pair represents a range of positive
// integers, normalize the list so that no ranges overlap but the set of integers
// described by the ranges are the same.
//
// e.g.
// in  [[10,14], [12,18]]
// out [[10,14], [15,18]]
//
// For a given range [c,d] and the previous range [x,y]. Only need to compare the
// previous one because all ranges before this have been normalised.
//
// Same first element (c == x) 
// -> Remove the smallest range
//
// First element within a previous range (x < c <= y) AND
//   i)  second element not in previous range (d > y)
//       -> Update the second element to y + 1 (d := y + 1)
//   ii) second element within previous (x < d <= y)
//       -> Delete [c,d] from the list
function normalizeRangeList(rangeList) {
  let i = 1;
  let [x,y] = rangeList[0];
  let toDelete = [];
  while (i < rangeList.length) {
    let [c,d] = rangeList[i]; 
    if (c == x) {
      // same first element
      if (d <= y) {
        toDelete.push(i);
      } else {
        toDelete.push(i-1);
      }
    } else if (c > x && c <= y) {
      // first element within previous range
      if (d > y) {
        // range extends beyond previous
        rangeList[i][0] = y+1;
      } else {
        // subset of previous range
        toDelete.push(i);
      }
    }
    [x,y] = rangeList[i];
    i += 1;
  }
  for (let j=toDelete.length - 1; j >= 0; j--) {
    rangeList.splice(toDelete[j], 1);
  }
}

function lookup(rangeList, value) {
  // rangeListArray = [[a0, b0], ...., [aN, bN]]
  // returns true if the needle lies within a range [aX, aX], 0 <= X <= N
  function inRangeList(rangeListArray, start, end, needle) {
    if (start == end) {
      return false;
    }

    let mid = start + Math.floor((end - start) / 2);
    let [a, b] = rangeListArray[mid];
    if (needle >= a && needle <= b) {
      return true;
    } else if (needle < a) {
      return inRangeList(rangeListArray, start, mid, needle);
    } else if (needle > b) {
      return inRangeList(rangeListArray, mid+1, end, needle);
    }
  }
  return inRangeList(rangeList, 0, rangeList.length, value);
}

export function day5(filepath) {
  return new Promise((resolve, reject) => {
      readFile(filepath, {encoding: 'utf-8'}, (err, data) => {
        if (err) 
          return reject(err);
        let [ranges, inputs] = data.split("\n\n");
        let rangeList = [];
        let result = 0;
        ranges = ranges.trim().split('\n');
        inputs = inputs.trim().split('\n');
        for (const r of ranges) {
          let [s,e] = r.split("-");
          insertSortedBinSearch(rangeList, [Number(s), Number(e)], x => x[0]);
        }
        normalizeRangeList(rangeList)
        for (let i of inputs) {
          i = Number(i);
          if (lookup(rangeList, i)) {
            result += 1;
          }
        }
        resolve(result);
      });
  });
}
