// 测试代码
import { reactive } from "./reactive.js";

// const obj = {};

// const arr = reactive([1, 2, obj]);

// function fn() {
// state.c.d;
// "e" in state;
// arr是proxy对象,即arr[2]是proxy对象(递归调用),而obj是普通对象,所以无法找到
// 解决方案: 1:将obj转换为proxy对象,2:在proxy对象上找不到时再去原始对象上找一遍
// vue中采用的方案2
//   const result = arr.includes(obj);
//   console.log(result);
// }

// fn();

const arr = reactive([1, 2, 3]);

// 添加属性,触发更新,但是没有收集length的依赖(隐式更改) 原理:
// Object.defineProperty(arr, "length", {
//   value: 5,
// });
// 手动将length减小时,没有触发其他删除的属性的delete
// arr.length = 1;

// 此时会触发length的get 但这是多余的
// 解决方案:  1.重写这些方法  2.在调用这些方法的期间,暂停依赖收集
arr.push("123");
console.log(arr);
