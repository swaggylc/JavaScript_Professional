import { TrackOpTypes } from "./operations.js";

let shouldTrack = true;
// 暂停依赖收集
export function pauseTracking() {
  shouldTrack = false;
}
// 恢复依赖收集
export function resumeTracking() {
  shouldTrack = true;
}

// 依赖收集
export function track(target, type, key) {
  if (!shouldTrack) return;
  if (type === TrackOpTypes.ITERATE) return;
  console.log(`%c[${type}]: `, "color: red", key);
}
// 派发更新
export function trigger(target, type, key) {
  console.log(`%c[${type}]: `, "color: blue", key);
}
