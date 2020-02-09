const { performance } = require("perf_hooks");

const time = cb => {
  const ti = performance.now();
  cb();
  const te = performance.now();
  return te - ti;
};

const makeArray = n => new Array(n).fill(0).map((_, i) => i);

exports.time = time;
exports.makeArray = makeArray;
