class Computed {
  constructor() {
    /**
     *   computed: {
            nameAge() {
                console.log("nameAge 计算属性调用");
                return this.name + this.age;
            },
        },

        {
            key：nameAge
            value：计算出来的的值
            get： nameAge Fn  依赖变化--> 执行get
            dep：['name','age']
        }


     */
    //  每一个计算属性
    this.computedData = [];
  }
  /**
   * @description:
   * @param {}
   * @return {}
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
   * @description:
   * @param {}
   * @return {}
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
   * @description:
   * @param {}
   * @return {}
   */
  _addComputedData(computedDataIns) {
    this.computedData.push(computedDataIns);
  }
  /**
   * @description:
   * @param {}
   * @return {}
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
