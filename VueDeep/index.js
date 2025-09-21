// 测试代码
import { reactive } from "./reactive.js";

const state = reactive({
  a: 1,
  b: 2,
  c: {
    d: 3,
  },
});

function fn() {
  //   state.c.d;
  "e" in state;
}

fn();
