function debounce(fn, delay, immediate = false) {
  let timer = null;
  let called = false;
  const _debounce = function (...args) {
    if (timer) clearTimeout(timer);
    if (immediate && !called) {
      fn.apply(this, args);
      called = true;
    }
    timer = setTimeout(() => {
      fn.apply(this, args);
      called = false;
    }, delay);
  };
  return _debounce;
}
