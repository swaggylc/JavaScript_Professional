import reactive from "./reactive";
import Computed from "./computed";

class Vue {
  constructor(options) {
    const { data, computed, watch } = options;
    this.$data = data();
    this.init(this, computed, watch);
  }

  /**
   * @description: 初始化vue实例
   * @param {*} vm vue实例
   * @param {*} computed 计算属性
   * @param {*} watch 监听
   * @return {}
   */
  init(vm, computed, watch) {
    this.initData(vm);
    const computedIns = this.initComputed(vm, computed);
    const watcherIns = this.initWatcher(vm, watch);
    this.$updateComputed = computedIns.update.bind(computedIns);
  }
  /**
   * @description: 初始化响应式数据
   * @param {*} vm vue实例
   * @return {}
   */
  initData(vm) {
    reactive(
      vm,
      (key, val) => {},
      (key, newVal, oldVal) => {
        this.$updateComputed(key);
      }
    );
  }
  /**
   * @description: 初始化计算属性
   * @param {*} vm vue实例
   * @param {*} computed 计算属性
   * @return {}
   */
  initComputed(vm, computed) {
    // 枚举每一个computed 添加到computedData中
    // 返回computed实例 实例中有updata方法，用来更新value(computed的值)
    const computedIns = new Computed();
    // 添加计算属性
    for (let key in computed) {
      computedIns.addComputed(vm, computed, key);
    }
    return computedIns;
  }
  /**
   * @description: 初始化监听
   * @param {*} vm vue实例
   * @param {*} watch 监听
   * @return {}
   */
  initWatcher(vm, watch) {}
}

export default Vue;
/**
 * 响应式数据
 * data()
 *
 *
 * 计算属性
 * computed()
 *
 *
 *
 *
 * watch监听
 * watch()
 */
