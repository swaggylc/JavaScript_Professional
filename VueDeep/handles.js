import { track, trigger } from "./effect.js";
import { isObject, hasChange } from "./utils.js";
import { reactive } from "./reactive.js";
import { TrackOpTypes, TriggerOpTypes } from "./operations.js";

function get(target, key, receiver) {
  // 依赖收集
  track(target, TrackOpTypes.GET, key);
  // 使用receiver可以解决this指向问题(computed)
  const result = Reflect.get(target, key, receiver);
  // 递归处理嵌套对象
  if (isObject(result)) {
    return reactive(result);
  }
  return result;
}

function set(target, key, value, receiver) {
  // 为什么不用 in 操作符
  // 因为 in 操作符会触发 has 操作符的监听
  // 而 has 操作符的监听会触发 track 操作
  // 所以这里用 hasOwnProperty 方法判断是否是新增属性
  const type = target.hasOwnProperty(key)
    ? TriggerOpTypes.SET
    : TriggerOpTypes.ADD;
  // 旧值
  const oldVal = target[key];
  const result = Reflect.set(target, key, value, receiver);
  // 赋值失败直接返回,不执行后续逻辑
  if (!result) return result;
  // 值有变化 || 新增属性
  if (hasChange(oldVal, value) || type === TriggerOpTypes.ADD) {
    // 派发更新
    trigger(target, type, key);
  }
  return result;
}

// 监听 in 操作符
function has(target, key) {
  // 依赖收集
  track(target, TrackOpTypes.HAS, key);
  return Reflect.has(target, key);
}

// 监听迭代操作(for in)
function ownKeys(target) {
  // 依赖收集
  track(target, TrackOpTypes.ITERATE);
  return Reflect.ownKeys(target);
}

// 监听 delete 操作符
function deleteProperty(target, key) {
  const hadKey = target.hasOwnProperty(key);
  const result = Reflect.deleteProperty(target, key);
  // 原来有 并且 删除成功
  if (hadKey && result) {
    // 派发更新
    trigger(target, TriggerOpTypes.DELETE, key);
  }
  return result;
}

// 监听逻辑
export const handles = {
  get,
  set,
  has,
  ownKeys,
  deleteProperty,
};
