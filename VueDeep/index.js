// 测试代码
import { reactive } from "./reactive.js";

const obj = {};

const arr = reactive([1, 2, obj]);

function fn() {
  // state.c.d;
  // "e" in state;
  // arr是proxy对象,即arr[2]是proxy对象(递归调用),而obj是普通对象,所以无法找到
  // 解决方案: 1:将obj转换为proxy对象,2:在proxy对象上找不到时再去原始对象上找一遍
  // vue中采用的方案2
  const result = arr.includes(obj);
  console.log(result);
}

fn();
