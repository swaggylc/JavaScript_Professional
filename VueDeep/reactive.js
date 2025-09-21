import { isObject } from "./utils.js";
import { handles } from "./handles.js";

// 建立一个map结构,实现 对象---> proxy对象 的映射
const proxyMap = new WeakMap();

export function reactive(obj) {
  // 不是对象，直接返回
  if (!isObject(obj)) return obj;
  // 如果已经代理过了，直接返回
  if (proxyMap.has(obj)) return proxyMap.get(obj);
  const _proxy = new Proxy(obj, handles);
  // 缓存代理对象
  proxyMap.set(obj, _proxy);
  // 返回代理对象
  return _proxy;
}
