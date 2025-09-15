/**
 * @description: 响应式数据
 * @param {*} vm vue实例
 * @param {function} __get__ 在get中需要做的回调
 * @param {function} __set__ 在set中需要做的回调
 * @return {}
 */
function reactive(vm, __get__, __set__) {
  // 原数据
  const _data = vm.$data;
  for (let key in _data) {
    Object.defineProperty(vm, key, {
      get: function () {
        // 执行回调 键-值
        if (__get__ && typeof __get__ === "function") __get__(key, _data[key]);
        return _data[key];
      },
      set: function (val) {
        // 保存旧值
        let oldVal = _data[key];
        // 更新
        _data[key] = val;
        // 执行回调 键-新值-旧值
        if (__set__ && typeof __set__ === "function") __set__(key, val, oldVal);
      },
    });
  }
}

export default reactive;
