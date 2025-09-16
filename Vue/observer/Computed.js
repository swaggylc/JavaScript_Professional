/**
 * 计算属性管理器类，用于处理Vue中的计算属性功能
 */
class Computed {
  /**
   * 构造函数，初始化计算属性数据存储数组
   */
  constructor() {
    /**
     * 计算属性数据结构示例：
     * {
     *   key: 'nameAge',           // 计算属性名称
     *   value: '张三18',           // 计算属性的值
     *   get: nameAge函数,          // 计算属性的getter函数
     *   dep: ['name', 'age']       // 计算属性依赖的响应式数据
     * }
     */
    // 存储所有计算属性的数据
    this.computedData = [];
  }
  
  /**
   * 添加计算属性到Vue实例
   * @description 将计算属性添加到Vue实例上，并设置响应式依赖关系
   * @param {Object} vm - Vue实例对象
   * @param {Object} computed - 包含所有计算属性的对象
   * @param {string} key - 当前要添加的计算属性名称
   * @return {void}
   */
  addComputed(vm, computed, key) {
    // 获取属性描述符
    const descriptor = Object.getOwnPropertyDescriptor(computed, key);
    const descriptorFn = descriptor.value.get
      ? descriptor.value.get
      : descriptor.value;
    const value = descriptorFn.call(vm);
    const get = descriptorFn.bind(vm);
    const dep = this._getDep(descriptorFn);
    this._addComputedData({
      key,
      value,
      get,
      dep,
    });
    const dataItem = this.computedData.find((item) => item.key === key);
    Object.defineProperty(vm, key, {
      get: function () {
        return dataItem.value;
      },
      set: function () {
        // 如果需要更改computed，必须调用get方法(获取真实算出来的值，这里不管参数)
        dataItem.value = dataItem.get();
      },
    });
  }
  /**
   * 解析计算属性函数中的依赖项
   * @description 从函数源码中提取出所有使用的this.xxx形式的依赖属性
   * @param {Function} fn - 计算属性的getter函数
   * @return {Array<string>} 返回依赖的属性名数组
   * @private
   */
  _getDep(fn) {
    // 解析计算属性的回调函数中用到的'this.xxx'
    // 优化正则表达式，确保能正确匹配各种形式的this.xxx
    const matched = fn.toString().match(/this\.([a-zA-Z_$][a-zA-Z0-9_$]*)/g);
    // 处理没有匹配到任何依赖的情况
    if (!matched) {
      return [];
    }
    // 提取属性名
    return matched.map((item) => {
      const parts = item.split(".");
      return parts[1]; // 返回this.后面的属性名
    });
  }
  /**
   * 将计算属性数据添加到内部存储
   * @description 将计算属性的相关信息存储到computedData数组中
   * @param {Object} computedDataIns - 计算属性数据对象
   * @param {string} computedDataIns.key - 计算属性名称
   * @param {*} computedDataIns.value - 计算属性的值
   * @param {Function} computedDataIns.get - 计算属性的getter函数
   * @param {Array<string>} computedDataIns.dep - 计算属性依赖的属性数组
   * @return {void}
   * @private
   */
  _addComputedData(computedDataIns) {
    this.computedData.push(computedDataIns);
  }
  /**
   * 更新依赖指定属性的所有计算属性
   * @description 当响应式数据发生变化时，更新所有依赖该数据的计算属性
   * @param {string} key - 发生变化的响应式属性名
   * @param {Function} [callback] - 更新完成后的回调函数，接收(computedKey, computedValue)参数
   * @return {void}
   */
  update(key, callback) {
    this.computedData.map((item) => {
      const _dep = item.dep;
      const _key = _dep.find((ele) => ele === key);
      if (_key) {
        item.value = item.get();
        callback && callback(item.key, item.value);
      }
    });
  }
}
export default Computed;
