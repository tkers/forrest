const { time, makeArray } = require("./utils");

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
  return false;
};

const longArray = makeArray(1000);

const linTime = time(() => linearSearch(longArray, -1));
console.log("Linear Search:", linTime, "ms");

const bsTime = time(() => binarySearch(longArray, -1));
console.log("Binary Search:", bsTime, "ms");
