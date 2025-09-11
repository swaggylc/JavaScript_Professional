function throttle(fn, interval) {
  let lastTime = 0;
  const _throttle = function (...args) {
    const nowTime = Date.now();
    if (interval - (nowTime - lastTime) <= 0) {
      fn.apply(this, args);
      lastTime = nowTime;
    }
  };
  return _throttle;
}
