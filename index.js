const { performance } = require("perf_hooks");

const time = () => {
  const ti = performance.now();
  return () => {
    const te = performance.now();
    return te - ti;
  };
};

const makeArray = n => new Array(n).fill(0).map((_, i) => i);

const linearSearch = (arr, needle) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === needle) {
      return true;
    }
  }
  return false;
};

const binarySearch = (arr, needle) => {
  let min = 0;
  let max = arr.length;
  while (min + 1 < max) {
    const mid = Math.floor((min + max) / 2);
    if (mid === needle) {
      return true;
    } else if (mid > needle) {
      max = mid;
    } else if (mid < needle) {
      min = mid;
    }
  }
};

const longArray = makeArray(1e7);
const t = time();
binarySearch(longArray, -1);
const e = t();
console.log("Time:", e, "ms");
