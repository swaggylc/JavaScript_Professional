/**
 * @description: 防抖函数
 * @param {*} fn 要防抖的函数
 * @param {*} delay 防抖时间
 * @param {*} immediate 是否立即执行
 * @return {*}
 */
function debounce(fn, delay, immediate = false) {
  let timer = null;
  let called = false;
  const _debounce = function (...args) {
    if (timer) clearTimeout(timer);
    if (immediate && !called) {
      fn.apply(this, args);
      timer = null;
      called = true;
    }
    timer = setTimeout(() => {
      fn.apply(this, args);
      timer = null;
      called = false;
    }, delay);
  };
  // 取消函数执行
  _debounce.cancel = function () {
    if (timer) clearTimeout(timer);
    timer = null;
    called = false;
  };
  return _debounce;
}
