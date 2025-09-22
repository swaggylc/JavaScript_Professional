import { TrackOpTypes, TriggerOpTypes } from "./operations.js";

let shouldTrack = true;
// 暂停依赖收集
export function pauseTracking() {
  shouldTrack = false;
}
// 恢复依赖收集
export function resumeTracking() {
  shouldTrack = true;
}

let activeEffect = null;
const effectStack = [];

export function effect(fn, options = {}) {
  const effectFn = () => {
    try {
      activeEffect = effectFn;
      effectStack.push(effectFn);
      return fn();
    } finally {
      effectStack.pop();
      activeEffect = effectStack[effectStack.length - 1];
    }
  };
  effectFn.deps = [];
  if (!options.lazy) {
    effectFn();
  }
  return effectFn;
}

export function clearFnDeps(effectFn) {
  const { deps } = effectFn;
  if (!deps.length) return;
  for (const dep of deps) {
    dep.delete(effectFn);
  }
  deps.length = 0;
}

const targetMap = new WeakMap();
// 标记迭代操作
const ITERATE_KEY = Symbol("iterate");

// 依赖收集
export function track(target, type, key) {
  if (!shouldTrack || !activeEffect) return;
  // 获取属性
  let propMap = targetMap.get(target);
  if (!propMap) {
    propMap = new Map();
    targetMap.set(target, propMap);
  }
  if (type === TrackOpTypes.ITERATE) {
    key = ITERATE_KEY;
  }
  let typeMap = propMap.get(key);
  if (!typeMap) {
    typeMap = new Map();
    propMap.set(key, typeMap);
  }
  let depSet = typeMap.get(type);
  if (!depSet) {
    depSet = new Set();
    typeMap.set(type, depSet);
  }
  // 建立函数set
  if (!depSet.has(activeEffect)) {
    depSet.add(activeEffect);
    activeEffect.deps.push(depSet);
  }
}
// 派发更新
export function trigger(target, type, key) {
  const effectFns = getEffectFns(target, type, key);
  for (const effectFn of effectFns) {
    // 避免触发当前正在运行的effect
    if (effectFn === activeEffect) continue;
    effectFn();
  }
}

function getEffectFns(target, type, key) {
  const propMap = targetMap.get(target);
  if (!propMap) return;
  const keys = [key];
  if (type === TriggerOpTypes.ADD || type === TriggerOpTypes.DELETE) {
    keys.push(ITERATE_KEY);
  }
  const effectFns = new Set();
  const TriggerTypeMap = {
    [TriggerOpTypes.SET]: [TrackOpTypes.GET],
    [TriggerOpTypes.ADD]: [
      TrackOpTypes.GET,
      TrackOpTypes.HAS,
      TrackOpTypes.ITERATE,
    ],
    [TriggerOpTypes.DELETE]: [
      TrackOpTypes.GET,
      TrackOpTypes.HAS,
      TrackOpTypes.ITERATE,
    ],
    [TriggerOpTypes.CLEAR]: [TrackOpTypes.ITERATE],
  };
  for (const key of keys) {
    const typeMap = propMap.get(key);
    if (!typeMap) continue;
    const trackTypes = TriggerTypeMap[type];
    for (const trackType of trackTypes) {
      const depSet = typeMap.get(trackType);
      if (depSet) {
        depSet.forEach((effectFn) => {
          effectFns.add(effectFn);
        });
      }
    }
  }
  return effectFns;
}
