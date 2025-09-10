function debounce(fn, delay, immediate = false, callBack) {
  let timer = null;
  let called = false;
  const _debounce = function (...args) {
    if (timer) clearTimeout(timer);
    if (immediate && !called) {
      const result = fn.apply(this, args);
      callBack(result);
      timer = null;
      called = true;
    }
    timer = setTimeout(() => {
      const result = fn.apply(this, args);
      callBack(result);
      timer = null;
      called = false;
    }, delay);
  };
  return _debounce;
}
