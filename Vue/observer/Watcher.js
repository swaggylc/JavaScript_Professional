class Watcher {
  /**
   * Watcher类 - 负责管理和触发响应式数据的监听器
   * @class
   */
  constructor() {
    /**
     * 存储所有监听器的数组
     * @type {Array<{key: string, fn: Function}>}
     */
    this.watchers = [];
  }
  
  /**
   * 添加一个监听器
   * @param {Object} vm - Vue实例
   * @param {Object} watcher - 包含监听器函数的对象
   * @param {string} key - 要监听的属性名
   * @returns {void}
   */
  addWatcher(vm, watcher, key) {
    this._addWaterData({
      key,
      fn: watcher[key].bind(vm),
    });
  }
  
  /**
   * 触发指定属性的所有监听器回调函数
   * @param {string} key - 发生变化的属性名
   * @param {*} newVal - 新值
   * @param {*} oldVal - 旧值
   * @returns {void}
   */
  invoke(key, newVal, oldVal) {
    this.watchers.map((item) => {
      if (item.key === key) {
        item.fn(newVal, oldVal);
      }
    });
  }
  
  /**
   * 私有方法 - 向watchers数组添加监听器数据
   * @private
   * @param {Object} watcherDataIns - 监听器数据对象
   * @param {string} watcherDataIns.key - 监听的属性名
   * @param {Function} watcherDataIns.fn - 监听器回调函数
   * @returns {void}
   */
  _addWaterData(watcherDataIns) {
    this.watchers.push(watcherDataIns);
  }
}

export default Watcher;
