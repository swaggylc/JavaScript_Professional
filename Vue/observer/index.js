import reactive from "./reactive";

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
  }
  /**
   * @description: 初始化响应式数据
   * @param {*} vm vue实例
   * @return {}
   */
  initData(vm) {
    reactive(
      vm,
      (key, val) => {
        console.log(key, val);
      },
      (key, newVal, oldVal) => {
        console.log(key, newVal, oldVal);
      }
    );
  }
  /**
   * @description: 初始化计算属性
   * @param {*} vm vue实例
   * @param {*} computed 计算属性
   * @return {}
   */
  initComputed(vm, computed) {}
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
