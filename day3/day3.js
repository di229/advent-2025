export function day3(input) {
  let sum = 0;
  for (const bank of input) {
    let currMaxIndexes = [0];
    for (let i=1; i<bank.length-1; i++) {
      if (bank[i] > bank[currMaxIndexes[0]]) {
        // new maximum
        currMaxIndexes = [i];
      } else if (bank[i] == bank[currMaxIndexes[0]]) {
        // more indexes with the same maximal most significant digit
        currMaxIndexes.push(i);
      }
    }
    const cand = [];
    for (const i of currMaxIndexes) {
      let maxIdx = i+1;
      for (let j=maxIdx+1; j<bank.length; j++) {
        if (bank[j] > bank[maxIdx]) {
          maxIdx = j;
        }
      }
      cand.push(Number(bank[i] + bank[maxIdx]));
    }
    sum += cand.reduce((v,t) => {
      return (v > t) ? v : t;
    }, 0);
  }
  return sum;
}
